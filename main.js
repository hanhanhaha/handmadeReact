import { ToyReact,Component } from './ToyReact'

class MyComponent extends Component{
    render(){
        return <div>
            {this.children}
            </div>
    }
}

let a = 
    <div>ccc
        <MyComponent>
            {11===12}
    <div>aaa</div>
    <h1>bbb</h1>
</MyComponent>
    </div>
console.log(a)
ToyReact.render(a,document.body)