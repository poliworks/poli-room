package controllers

import play.api.mvc.{Action, Controller}
import traits.Interceptors

class UserController extends Controller with Interceptors {

  def registerUser = Action(parse.json) { request =>

    Ok("Done")
  }

}
