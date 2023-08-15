export default defineNuxtRouteMiddleware(async (to, from) => {

  if(process.client) {

    console.log('asd', to, from)
    // if(from.query.redirect) {
    //   return navigateTo(from.query.redirect)
    // }
  }
});
