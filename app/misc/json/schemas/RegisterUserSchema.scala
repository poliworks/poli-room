package misc.json.schemas

import misc.json.JsonValidator.JsonValidator
import misc.json.validators.{EmailValidator, PasswordValidator, UserTypeValidator}
import play.api.libs.json._
import play.api.libs.functional.syntax._
import traits.{JsonSchema, SchemaObject}

case class RegisterUserSchema(name: String, email: String, password: String, userType: String) extends JsonSchema {

  override def toJson: JsValue = Json.toJson(this)
}

object RegisterUserSchema extends SchemaObject[RegisterUserSchema] {
  override implicit val reads: Reads[RegisterUserSchema] = (
    (__ \ "name").read[String] and
    (__ \ "email").validate(EmailValidator) and
    (__ \ "password").validate(PasswordValidator) and
    (__ \ "user_type").validate(UserTypeValidator)
  )(RegisterUserSchema.apply _)

  override implicit val writes: Writes[RegisterUserSchema] = Json.writes[RegisterUserSchema]
}
