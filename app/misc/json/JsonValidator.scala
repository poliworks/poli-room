package misc.json

import play.api.data.validation.ValidationError
import play.api.libs.json.{JsPath, Reads}
import misc.json.validators._
import traits.Validator

object JsonValidator {

  implicit class JsonValidator(val jsPath: JsPath) {

    def validate[A](validator: Validator[A] = new AlwaysValidator[A])(implicit r: Reads[A]) = {
      jsPath.read[A].filter(ValidationError(validator.errorMessage))(validator.validateFunction)
    }

    def validateOptional[A](validator: Validator[A] = new AlwaysValidator[A])(implicit r: Reads[A]): Reads[Option[A]] = {
      jsPath.readNullable[A].filter(ValidationError(validator.errorMessage))(x => if (x.isDefined) validator.validateFunction(x.get) else true)
    }
  }

}
