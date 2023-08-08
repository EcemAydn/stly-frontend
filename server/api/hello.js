export default defineEventHandler((event) => {
  console.log(event.context);
  return {
    hello:'world'
  }
})