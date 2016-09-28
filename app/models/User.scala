package models

import models.dao.UserDAO
import scalikejdbc._
import traits.DatabaseModel
import com.github.t3hnar.bcrypt._
import misc.exceptions.BadRequestException

case class User(name: String, email: String, encryptedPassword: String, userType: String, id: Long = 0L) {
  def checkPassword(password: String): Boolean = password.isBcrypted(this.encryptedPassword)
}

object User extends DatabaseModel[User]("users") {

  override def apply(rn: ResultName[User])(rs: WrappedResultSet): User = User(
    rs.get(rn.name), rs.get(rn.email), rs.get(rn.encryptedPassword), rs.get(rn.userType) ,rs.get(rn.id)
  )

  override def apply(rs: WrappedResultSet): User = User(
    rs.string("name"), rs.string("email"), rs.string("encrypted_password"), rs.string("user_type"), rs.long("id")
  )

  @throws(classOf[BadRequestException])
  def register(user: User, password: String): User = {
    val preparedUser = user.copy(encryptedPassword = password.bcrypt)
    val dao = new UserDAO()
    DB localTx { implicit session =>
      dao.findUserByEmail(preparedUser.email) match {
        case Some(_) => throw new BadRequestException("User with this email already exists")
        case None => dao.createUser(preparedUser)
      }
    }
  }

  def login(email: String, password: String): Option[User] = DB readOnly { implicit session =>
    new UserDAO().findUserByEmail(email).filter(_.checkPassword(password))
  }

}
