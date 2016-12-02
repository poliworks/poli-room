package controllers

import javax.inject.Inject

import components.TokenService
import misc.exceptions.ForbiddenException
import misc.json.schemas.{LoginUserSchema, RegisterUserSchema}
import models.User
import play.api.Logger
import play.api.libs.json.{JsObject, Json}
import play.api.mvc.{Action, Controller}
import traits.{ITokenService, Interceptors}

class UserController @Inject()(tokenService: ITokenService) extends Controller with Interceptors {

  def registerUser = Action(schemaCoerce(RegisterUserSchema)) { request =>
    val newUser = User.register(request.body)
    Ok(newUser.getJsonUserWithToken(tokenService))
  }

  def login = Action(schemaCoerce(LoginUserSchema)) { request =>
    val user: Option[User] = User.login(request.body)
    Logger.info(user.toString)
    user match {
      case Some(u) => Ok(u.getJsonUserWithToken(tokenService))
      case None => throw new ForbiddenException("Incorrect email or password")
    }
  }


}
