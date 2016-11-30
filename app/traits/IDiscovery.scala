package traits

/**
  * Created by leoiacovini on 9/21/16.
  */
trait IDiscovery {
  type RouteEntry = Map[String, String]
  def routesFor(accessor: String): Map[String, RouteEntry]
  def renderUrl(url: String, replaceMap: Map[String, String]): String
  def getRoute(routeName: String, replaceMap: Map[String, String] = Map()): String
}
