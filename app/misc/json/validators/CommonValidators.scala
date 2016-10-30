package misc.json.validators

import traits.Validator

class AlwaysValidator[A] extends Validator[A] {
  override val errorMessage: String = "Always valid"
  override def validateFunction(x: A): Boolean = true
}

object StateValidator extends Validator[String] {
  val validStates = List("SP", "RJ", "ES", "MG", "GO", "MT", "PA", "PR", "BA", "PE", "AM",
    "RO", "RR", "RS", "DF", "AC", "CE", "MA", "TO", "AP", "RN", "AL", "SE", "PB", "MS", "PI", "SC")
  override val errorMessage: String = "State not valid"
  override def validateFunction(x: String): Boolean = validStates.contains(x)
}

object PostcodeValidator extends Validator[String] {
  override val errorMessage: String = "Invalid postcode"
  override def validateFunction(x: String): Boolean = x.matches("""\d{5}-\d{3}""")
}

object EmailValidator extends Validator[String] {
  override val errorMessage: String = "Invalid email"
  override def validateFunction(x: String): Boolean = x.contains("@")
}

object PasswordValidator extends Validator[String] {
  override val errorMessage: String = "Invalid password"
  override def validateFunction(x: String): Boolean = x.length >= 6
}

object UserTypeValidator extends Validator[String] {
  override val errorMessage: String = "Invalid User Type"
  override def validateFunction(x: String): Boolean = List("student", "teacher").contains(x)
}