package models.dao

import models.User
import scalikejdbc._

class UserDao {

  private val u = User.syntax("u")

  def createUser(user: User)(implicit session: DBSession): User = {
    val id = sql"INSERT INTO users (name, email, user_type) VALUES (${user.name}, ${user.email}, ${user.userType})"
      .updateAndReturnGeneratedKey.apply
    user.copy(id = id)
  }

  def findUserById(id: Long)(implicit session: DBSession): Option[User] = {
    sql"SELECT * FROM users WHERE id = ${id}".map(User.apply).single.apply()
  }

  def findUserByEmail(email: String)(implicit session: DBSession): Option[User] = {
    sql"SELECT * FROM users WHERE email = ${email}".map(User.apply).single.apply()
  }

}
