package interceptors

import play.api.libs.json.JsValue
import play.api.mvc.{Request, WrappedRequest}

class AuthRequest[A](request: Request[A], val jsonToken: JsValue) extends WrappedRequest[A](request) {
  private def getToken(tk: String): Option[String] = {
    val splitToken: Array[String] = tk.split(" ")
    if (splitToken.head == "Bearer") Some(splitToken.last) else None
  }
  def userType = (jsonToken \ "userType").as[String]
  def userId = (jsonToken \ "id").as[Long]
  def tokenScope = (jsonToken \ "scope").as[String]
  val rawToken: Option[String] = request.headers.get("Authorization").flatMap(getToken)
}
