package interceptors

import play.api.libs.json.JsValue
import play.api.mvc.{Request, WrappedRequest}

class AuthRequest[A](request: Request[A], val tokenData: JsValue) extends WrappedRequest[A](request) {
  private def getToken(tk: String): Option[String] = {
    val splitToken: Array[String] = tk.split(" ")
    if (splitToken.head == "Bearer") Some(splitToken.last) else None
  }
  def userType = (tokenData \ "userType").as[String]
  def userId = (tokenData \ "id").as[Long]
  def tokenScope = (tokenData \ "scope").as[String]
  val token: Option[String] = request.headers.get("Authorization").flatMap(getToken)
}
