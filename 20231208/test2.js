const obj = {
	name:'ingoo',
	getName() {
		console.log(obj.name)
	}
}
const obj2 = obj;
obj2.getName()

function inner() {
  console.log(3,this)
  function outer() {
    console.log('2',this)
    function hello () {
      console.log(4,this)
    }
    hello()
  }
  
  outer()
  return function() {
    console.log('1',this)
  }
}
inner()

inner.call({name:'ingoo'})

function inner() {
  console.log(3,this)
  const outer = () => {
    console.log(2, this)
    const hello = () => {
      console.log(4,this)
    }
    hello()
  }
  outer()
  return () => {
    console.log(1,this)
  }
}
const fn = inner.call({name:'ingoo'})
fn()