package controllers

import javax.inject.Inject

import misc.exceptions.ForbiddenException
import misc.json.schemas.{LoginUserSchema, RegisterUserSchema}
import play.api.Logger
import play.api.mvc._
import scalikejdbc._
import traits.{ITokenService, Interceptors}

class UserController @Inject()(tokenService: ITokenService) extends Controller with Interceptors {

  def registerUser = Action(schemaCoerce(RegisterUserSchema)) { request =>
    Ok
  }

  def login = Action(schemaCoerce(LoginUserSchema)) { request =>
    Ok
  }

  def getUserFromToken = AuthAction(tokenService)(null) { request =>
    Ok
  }


}
