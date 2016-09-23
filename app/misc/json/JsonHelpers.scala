package misc.json

import play.api.libs.json.{JsObject, JsString, JsValue}

object JsonHelpers {

  def toJsonError(message: String): JsValue = toJsonMessage("error", message)
  def toJsonMessage(messageName: String, message: String): JsValue = {
    JsObject(Map(messageName -> JsString(message)))
  }

}
