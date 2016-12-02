package misc.json.schemas

import play.api.libs.json.{JsValue, Json, Reads, Writes}
import traits.{JsonSchema, SchemaObject}

/**
  * Created by leoiacovini on 12/2/16.
  */
case class LoginUserSchema(email: String, password: String) extends JsonSchema {
  override def toJson: JsValue = Json.toJson(this)
}

object LoginUserSchema extends SchemaObject[LoginUserSchema] {
  override implicit val reads: Reads[LoginUserSchema] = Json.reads[LoginUserSchema]
  override implicit val writes: Writes[LoginUserSchema] = Json.writes[LoginUserSchema]
}
