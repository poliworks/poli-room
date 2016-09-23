package traits

import play.api.libs.json.{JsValue, Reads, Writes}

trait JsonSchema {
  def toJson: JsValue
}

trait SchemaObject[S <: JsonSchema] {
  implicit val reads: Reads[S]
  implicit val writes: Writes[S]
}
