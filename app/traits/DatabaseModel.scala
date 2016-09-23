package traits

import scalikejdbc._

// TODO:  Make it Trait with Dotty
abstract class DatabaseModel[M](override val tableName: String) extends SQLSyntaxSupport[M] {
  def apply(rn: ResultName[M])(rs: WrappedResultSet): M
  def apply(rs: WrappedResultSet): M
}
