package misc.json.schemas

import play.api.libs.json.{JsValue, Json, Reads, Writes}
import traits.{JsonSchema, SchemaObject}

/**
  * Created by leoiacovini on 12/1/16.
  */
case class RegisterProblemSchema(name: String, description: String, reportedBy: Long, featureId: Option[Long]) extends JsonSchema {
  override def toJson: JsValue = Json.toJson(this)
}

object RegisterProblemSchema extends SchemaObject[RegisterProblemSchema] {
  override implicit val reads: Reads[RegisterProblemSchema] = Json.reads[RegisterProblemSchema]
  override implicit val writes: Writes[RegisterProblemSchema] = Json.writes[RegisterProblemSchema]
}
