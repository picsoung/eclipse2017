import app from './app'

const router = app.$router
const meta = app.$meta() // here

export default (context) => {
  router.push(context.url)
  context.meta = meta // and here
  return app
}
