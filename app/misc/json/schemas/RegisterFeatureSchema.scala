package misc.json.schemas

import play.api.libs.json.{JsValue, Json, Reads, Writes}
import traits.{JsonSchema, SchemaObject}

/**
  * Created by leoiacovini on 12/1/16.
  */
case class RegisterFeatureSchema(name: String, description: String, quantity: Int, img: String) extends JsonSchema {
  override def toJson: JsValue = Json.toJson(this)
}

object RegisterFeatureSchema extends SchemaObject[RegisterFeatureSchema] {
  override implicit val reads: Reads[RegisterFeatureSchema] = Json.reads[RegisterFeatureSchema]
  override implicit val writes: Writes[RegisterFeatureSchema] = Json.writes[RegisterFeatureSchema]
}
