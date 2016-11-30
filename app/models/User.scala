package models

import models.dao.UserDao
import scalikejdbc._
import traits.DatabaseModel
import com.github.t3hnar.bcrypt._
import misc.exceptions.BadRequestException
import misc.json.schemas.RegisterUserSchema
import play.api.libs.json.{Format, Json}

case class User(name: String, email: String, encryptedPassword: String, userType: String, id: Long = 0L) {
  def checkPassword(password: String): Boolean = password.isBcrypted(this.encryptedPassword)
}

object User extends DatabaseModel[User]("users") {

  override def apply(rn: ResultName[User])(rs: WrappedResultSet): User = User(
    rs.get(rn.name), rs.get(rn.email), rs.get(rn.encryptedPassword), rs.get(rn.userType) ,rs.get(rn.id))

  override def apply(rs: WrappedResultSet): User = User(
    rs.string("name"), rs.string("email"), rs.string("encrypted_password"), rs.string("user_type"), rs.long("id"))

  implicit val format: Format[User] = Json.format[User]

  @throws(classOf[BadRequestException])
  def register(user: User, password: String): User = {
    val preparedUser = user.copy(encryptedPassword = password.bcrypt)
    val dao = new UserDao()
    DB localTx { implicit session =>
      dao.findUserByEmail(preparedUser.email) match {
        case Some(_) => throw new BadRequestException("User with this email already exists")
        case None => dao.createUser(preparedUser)
      }
    }
  }

  @throws(classOf[BadRequestException])
  def register(registerUserSchema: RegisterUserSchema): User = {
    val userToRegister = User(registerUserSchema.name, registerUserSchema.email, null, registerUserSchema.userType)
    User.register(userToRegister, registerUserSchema.password)
  }

  def login(email: String, password: String): Option[User] = DB readOnly { implicit session =>
    new UserDao().findUserByEmail(email).filter(_.checkPassword(password))
  }

}
