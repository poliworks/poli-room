
name := """poli-room"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  evolutions,
  filters,
  "org.postgresql" % "postgresql" % "9.4.1210",
  "com.pauldijou" %% "jwt-core" % "0.8.1",
  "com.pauldijou" %% "jwt-play-json" % "0.8.1",
  "com.github.t3hnar" %% "scala-bcrypt" % "2.6",
  "org.scalikejdbc" %% "scalikejdbc" % "2.5.0",
  "org.scalikejdbc" %% "scalikejdbc-config" % "2.5.0",
  "org.scalikejdbc" %% "scalikejdbc-play-initializer" % "2.5.1",
  "org.scalikejdbc" %% "scalikejdbc-play-dbapi-adapter" % "2.5.1",
  "org.scalikejdbc" %% "scalikejdbc-test" % "2.4.2" % Test,
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
)
