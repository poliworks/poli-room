package interceptors

import misc.json.JsonHelpers
import play.api.mvc.ActionRefiner
import traits.ITokenService
import play.api.mvc.Results._
import play.api.mvc._

import scala.concurrent.Future
import scala.util.{Failure, Success}

class CheckToken(tokenService: ITokenService, userType: String = null) extends ActionRefiner[Request, AuthRequest] {
  def refine[A](request: Request[A]) = Future.successful {
    new AuthRequest(request, null).rawToken.map { t => tokenService.validate(t, Option(userType)) match {
      case Success(token) => Right(new AuthRequest(request, token))
      case Failure(f) => Left(BadRequest(JsonHelpers.toJsonError("Invalid Token"))) }
    }.getOrElse(Left(BadRequest(JsonHelpers.toJsonError("Missing Token"))))
  }
}
