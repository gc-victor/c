function $(r){r.currentTarget.__handler__[r.type](r)}function D(r,d,_,f){let N=document.activeElement,m=document.body,b=r.length,o=d.length,g=b,u=0,l=0,i=[],a=[];for(;u<o||l<g;)if(o===u)for(;l<g;){let e=r[l],t=e.parentNode,n=f.indexOf(t);n!==-1&&(_[n].insertBefore(e,d[u]),i.push(e)),l++}else if(g===l)for(;u<o;){let e=d[u],t=e.parentNode,n=_.includes(e);t&&!n&&(t.removeChild(e),a.push(e)),u++}else if(d[u].isEqualNode(r[l]))u++,l++;else if(d[o-1].isEqualNode(r[g-1]))o--,g--;else{let e=d[u],t=r[l],n=e.parentNode,h=t.parentNode,s=i.includes(h),c=a.includes(n),p=_.includes(e),v=f.includes(t),M=e.tagName===t.tagName,O=Boolean(n&&n.parentNode);if(!s||!c||p&&v)if(!p&&!v&&M&&O&&!i.includes(h.parentNode))!f.includes(h)&&!_.includes(n)&&!m.contains(h)?(n.parentNode.replaceChild(h,n),i.push(h),i.push(t),a.push(n),a.push(e)):m.contains(t)||(n.replaceChild(t,e),i.push(t),a.push(e)),u++,l++;else if(p&&v&&M){let B=e.attributes,x=t.attributes,z=B.length,F=x.length,Y=Object.keys(x);for(let y=z-1;y>=0;y--){let C=B[y].name;!Y.includes(C)&&C!=="type"&&e.removeAttribute(C)}for(let y=0;y<F;y++){let C=x[y].name,k=x[y].value;e.setAttribute(C,k)}if(!e.__handler__&&t.__handler__){let y=Object.keys(t.__handler__||{}),C=y.length;for(let k=0;k<C;k++)t.removeEventListener(y[k],$),e.addEventListener(y[k],$)}e===N&&!t.children.length&&t.childNodes.length&&t.childNodes[0].nodeType===3&&(e.textContent=t.textContent),e.__handler__=t.__handler__,i.push(t),a.push(e),u++,l++}else!p&&v?l++:p&&!v?u++:(u++,l++);else s&&!c?l++:!s&&c?u++:p&&!v&&m.contains(t)?l++:p&&!v&&!m.contains(t)?(n.insertBefore(t,e),i.push(t),l++):!p&&v?(n.removeChild(e),a.push(e),u++):!v&&!p&&O?(n.replaceChild(t,e),i.push(t),a.push(e),u++,l++):(u++,l++)}}function G(r,d,_){let f=g(r),N=g(d),m=u(f[0],_),b=N.find(l=>{let i=_.__key__,a=l.__key__,e=_.getAttribute("name"),t=l.getAttribute("name");return i&&a&&i===a||e&&t&&e===t||!i&&_.isEqualNode(l)}),o=b&&u(N[0],b);return{p:f,n:N,pAncestry:m,nActiveElement:b,nAncestry:o};function g(l){let i=document.createTreeWalker(l,NodeFilter.SHOW_ELEMENT),a=[],e=i.currentNode;for(;e;)a.push(e),e=i.nextNode();return a}function u(l,i){let a=[];for(;i&&i!==l;){let e=i;a.push(e),i=e.parentNode}return a.push(l),a}}function I(r,d){if(!d)return r.parentNode.removeChild(r),d;let _=r.parentNode,f=document.activeElement;if(f&&f.tagName!=="BODY"&&r.contains(f)){let{p:N,n:m,pAncestry:b,nActiveElement:o,nAncestry:g}=G(r,d,f);if(!o)_.replaceChild(d,r);else return D(m,N,b,g),r}else _.replaceChild(d,r);return d}var P=I,L=P;var K=typeof global!="undefined"&&{}.toString.call(global)==="[object global]";K||(window.process={env:{TEST:!1}});var T=process.env.TEST?!1:K;var J,W=typeof queueMicrotask=="function"?queueMicrotask.bind(typeof window!="undefined"?window:global):r=>(J||(J=Promise.resolve())).then(r).catch(d=>setTimeout(()=>{throw d},0));var Q={value:1},S=new Set,A=new Map,E=new Map,w=new Map,j=new Map,q=new Map;function R(r){return d.bind(null,`__${Q.value++}__`);function d(_,f={}){let N,m,b=()=>{},o=f&&f.key?f.key+_:_,g=new Set;function u(e,t){let n=h=>{w.set(e,h);let s=i();!T&&N&&(s=L(N,s)),N=s};return w.has(e)||w.set(e,t),[()=>w.get(e),n]}function l(e,t,n){let h=!n,s=w.get(e),c=s?!n.every((p,v)=>JSON.stringify(p)===JSON.stringify(s[v])):!0;(h||c)&&(w.set(e,n),t(n))}return N=i();function i(){let e=0,t={},n=r({cleanup:s=>m=s||m,execute:(s,c)=>{let p=`execute${o}${e++}`;return g.add(p),l(p,s,c)},key:o,props:f,ref:s=>t.fn=s,update:s=>{let c=`update${o}${e++}`;return g.add(c),u(c,s)}}),h=E.get(o);return t.fn&&t.fn(n,h),!T&&n?(n.__key__=n.__key__||o,E.forEach(function(s,c){let p=A.get(c)||[];s&&!(E.get(c)&&!E.get(c).parentNode)&&n.contains(s)&&!p.includes(o)&&c!==o&&(A.set(o,[...new Set([...A.get(o)||[],c])]),S.add(c))}),E.set(o,n),j.set(o,g),q.set(o,m||b)):E.get(o)&&!n&&W(()=>m&&a()),n}function a(){let e=A.get(o),t=E.get(o)?[...e||[o]]:[];S.has(o)||t.push(o);let n=t.length;for(let h=0;h<n;h++){let s=t[h];if(E.has(s)){let c=q.get(s);c&&c(E.get(s)),E.set(s,0),(!S.has(s)||[...e||[]].includes(s))&&(j.get(s).forEach(p=>w.delete(p)),j.delete(s),E.delete(s)),S.delete(s),A.delete(s),q.delete(s)}}m=null,N=null}}}var te=R;export{Q as __keyCounter,R as c,te as default};
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
