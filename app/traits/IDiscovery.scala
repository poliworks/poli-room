package traits

/**
  * Created by leoiacovini on 9/21/16.
  */
trait IDiscovery {
  def routesFor(accessor: String): Map[String, String]
  def renderUrl(url: String, replaceMap: Map[String, String]): String
  def getRoute(routeName: String, replaceMap: Map[String, String] = Map()): String
}
