package controllers

import javax.inject.Inject

import misc.exceptions.ForbiddenException
import misc.json.schemas.{LoginUserSchema, RegisterUserSchema}
import models.User
import models.dao.UserDao
import play.api.Logger
import play.api.libs.json.JsValue
import play.api.mvc._
import scalikejdbc._
import traits.{ITokenService, Interceptors}

class UserController @Inject()(tokenService: ITokenService) extends Controller with Interceptors {

  def registerUser = Action(schemaCoerce(RegisterUserSchema)) { request =>
    val newUser = User.register(request.body)
    Ok(newUser)
  }

  def login = Action(schemaCoerce(LoginUserSchema)) { request =>
    val user: Option[JsValue] = User.login(request.body)
    Logger.info(user.toString)
    user match {
      case Some(u) => Ok(u)
      case None => throw new ForbiddenException("Incorrect email or password")
    }
  }

  def getUserFromToken = AuthAction(tokenService)(null) { request =>
    val userId = request.userId
    val user = DB readOnly { implicit session => new UserDao().findUserById(userId).get }
    Ok(user.getJsonUserWithToken(request.rawToken.get))
  }


}
