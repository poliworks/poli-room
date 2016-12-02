package models

import models.dao.UserDao
import scalikejdbc._
import traits.{DatabaseModel, ITokenService}
import com.github.t3hnar.bcrypt._
import misc.exceptions.BadRequestException
import misc.json.schemas.{LoginUserSchema, RegisterUserSchema}
import play.api.libs.json._

case class User(name: String, email: String, encryptedPassword: String, userType: String, id: Long = 0L) {
  def checkPassword(password: String): Boolean = password.isBcrypted(this.encryptedPassword)

  def getJsonUserWithToken(tokenService: ITokenService, token: String = null): JsValue = {
    val genToken = tokenService.create(this.id, this.userType)
    val baseUser = Json.toJson(this).as[JsObject] - "encryptedPassword"
    if (token == null) {
      baseUser + ("token", JsString(genToken))
    } else {
      baseUser+ ("token", JsString(token))
    }
  }
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

  def login(login: LoginUserSchema): Option[User] = DB readOnly { implicit session =>
    new UserDao().findUserByEmail(login.email).filter(_.checkPassword(login.password))
  }

}
