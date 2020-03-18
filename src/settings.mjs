import process from  'process';


const settings = {
  navi: {
    /**
     * Host and port on which RedisGraph Navi is exposed. Must be accessible to end user.
     */
    url: process.env.NAVI_EXTERNAL_URL || "http://127.0.0.1:3000",
    port: process.env.NAVI_PORT || 3000,
    client: {
      baseUrl: process.env.NAVI_CLIENT_BASE_URL || "/",
    },
    api: {
      baseUrl: process.env.NAVI_API_BASE_URL || "/api",
    }
  }
}

export default settings