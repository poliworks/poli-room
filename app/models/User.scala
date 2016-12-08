package models

import models.dao.UserDao
import scalikejdbc._
import traits.{DatabaseModel, ITokenService}
import com.github.t3hnar.bcrypt._
import misc.exceptions.BadRequestException
import misc.json.schemas.{LoginUserSchema, RegisterUserSchema}
import play.api.Logger
import play.api.libs.json._

import scalaj.http.Http

case class User(name: String, email: String, userType: String, id: Long = 0L) {

  def getJsonUserWithToken(token: String = null): JsValue = {
    val baseUser = Json.toJson(this).as[JsObject]
    baseUser + ("token", JsString(token))
  }
}

object User extends DatabaseModel[User]("users") {

  override def apply(rn: ResultName[User])(rs: WrappedResultSet): User = User(
    rs.get(rn.name), rs.get(rn.email), rs.get(rn.userType) ,rs.get(rn.id))

  override def apply(rs: WrappedResultSet): User = User(
    rs.string("name"), rs.string("email"), rs.string("user_type"), rs.long("id"))

  implicit val format: Format[User] = Json.format[User]

  @throws(classOf[BadRequestException])
  def register(user: User, password: String): JsValue = {
    val preparedUser = user
    val dao = new UserDao()
    DB localTx { implicit session =>
      dao.findUserByEmail(preparedUser.email) match {
        case Some(_) => throw new BadRequestException("User with this email already exists")
        case None => registerUserAuth(preparedUser, password)
      }
    }
  }

  private def registerUserAuth(user: User, password: String)(implicit session: DBSession): JsValue = {
    val postUser = (Json.toJson(new UserDao().createUser(user)).as[JsObject] + ("password" -> JsString(password))).toString()
    val response = Http("http://localhost:3000/register").header("Content-Type", "application/json").postData(postUser).asString.body
    Json.parse(response)
  }

  @throws(classOf[BadRequestException])
  def register(registerUserSchema: RegisterUserSchema): JsValue = {
    val userToRegister = User(registerUserSchema.name, registerUserSchema.email, registerUserSchema.userType)
    User.register(userToRegister, registerUserSchema.password)
  }

  def login(login: LoginUserSchema): Option[JsValue] = DB readOnly { implicit session =>
    new UserDao().findUserByEmail(login.email).map { u =>
        val response = Http("http://localhost:3000/login").header("Content-Type", "application/json").postData(login.toJson.toString()).asString
        if (response.code == 403) null else u.getJsonUserWithToken((Json.parse(response.body) \ "token").as[String])
    }

  }

}
