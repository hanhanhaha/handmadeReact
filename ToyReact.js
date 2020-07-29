export class Component{
    constructor(){
        this.children = []
    }
    mountTo(parent){
        let vdom = this.render()
        vdom.mountTo(parent)
    }
    setAttr(name,value){
        this[name] = value
    }
    append(vchild){
        this.children.push(vchild)
    }
}
class ElementWrapper{
    constructor(type){
        this.element =  document.createElement(type)
    }
    setAttr(name,value){
        this.element.setAttribute(name,value)
    }
    append(vchild){
        vchild.mountTo(this.element)
    }
    mountTo(parent){
        parent.appendChild(this.element)
    }
}
class TextWrapper{
    constructor(content){
        this.element =  document.createTextNode(content)
    }
    mountTo(parent){
        parent.appendChild(this.element)
    }
}

export let ToyReact = {
    createElement(type,attributes,...children){
        console.log(arguments)
        let element
        // debugger
        if(typeof type === 'string'){
            element = new ElementWrapper(type)
        }else{
            element = new type
        }
        for(let name in attributes){
            element.setAttr(name,attributes[name])
        }
        function insertChild(children){
            for(let child of children){
                if(typeof child==='object' && child instanceof Array){
                    insertChild(child)
                }else{
                    if(typeof child === 'string') child = new TextWrapper(child)                    
                    if(!(child instanceof Component)&&!(child instanceof ElementWrapper)&&!(child instanceof TextWrapper)){
                        child = String(child)
                    }
                    element.append(child)
                }
            }
        }
        insertChild(children)
        return element
    },
    render(vdom,element){
        vdom.mountTo(element)
    }
}