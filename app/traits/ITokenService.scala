package traits

import play.api.libs.json.JsValue
import scala.util.Try

trait ITokenService {

  def decode(token: String): Try[JsValue]
  def validate(token: String, userType: Option[String]): Try[JsValue]
  def create(userId: Long, userType: String): String
}
