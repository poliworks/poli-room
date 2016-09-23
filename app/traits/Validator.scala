package traits

trait Validator[A] {
  val errorMessage: String
  def validateFunction(x: A): Boolean
}
