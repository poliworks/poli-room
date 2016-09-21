package traits

import interceptors.CheckToken
import play.api.mvc.Action

trait Interceptors {
  def AuthAction(tokenService: ITokenService)(userType: String = null) = Action andThen new CheckToken(tokenService, userType)
}
