"use strict";(self.webpackChunkfried_potato=self.webpackChunkfried_potato||[]).push([[139],{7139:(e,s,r)=>{r.r(s),r.d(s,{default:()=>B});var t=r(624),n=r(9060);const i={users:"Users_users__pD0fE",usersBox:"Users_usersBox__u6ZjL",friendsBox:"Users_friendsBox__uM8Kt",user:"Users_user__8vmVS",pageButton:"Users_pageButton__JB+Ml",current:"Users_current__+0S4r",prev:"Users_prev__WMuWl",next:"Users_next__O-AGw",paginatorScrollButton:"Users_paginatorScrollButton__+Qln9",friends:"Users_friends__iwgrM",searchForm:"Users_searchForm__EJ8CE",searchFormInput:"Users_searchFormInput__k7JXX",searchFormBtn:"Users_searchFormBtn__xiHnw"};var l=r(12),o=r(2496);const a=e=>{let{overall:s,pageSize:r,portionSize:t,currentPage:l,setCurrentPageUsers:a}=e,u=Math.ceil(s/r),c=[];for(let n=1;n<=u;n++)c.push(n);const p=Math.ceil(u/t);let[h,d]=(0,n.useState)(1),g=(h-1)*t+1,m=h*t;return(0,o.jsxs)("div",{className:i.paginator,children:[h>1&&(0,o.jsx)("button",{className:i.paginatorScrollButton,id:i.prev,onClick:()=>{d(h-1)},children:"<< PREV"}),c.filter((e=>e>=g&&e<=m)).map(((e,s)=>(0,o.jsx)("button",{className:`${l===e?i.current:""} ${i.pageButton}`,onClick:s=>a(e),children:e},s))),p>h&&(0,o.jsx)("button",{className:i.paginatorScrollButton,id:i.next,onClick:()=>{d(h+1)},children:"NEXT >>"})]})};var u=r(2622);const c=(0,n.memo)((e=>(0,o.jsx)(u.QJ,{initialValues:{name:"",onlyFriends:""},onSubmit:(s,r)=>{let{setSubmitting:t}=r;"true"===s.onlyFriends?e.setFilterSearch(s.name,!0):"false"===s.onlyFriends?e.setFilterSearch(s.name,!1):e.setFilterSearch(s.name,null),t(!1)},className:i.formBlank,children:e=>{let{values:s,handleChange:r,handleBlur:t,errors:n,handleSubmit:l,isSubmitting:a}=e;return(0,o.jsxs)("form",{className:i.searchForm,onSubmit:l,children:[(0,o.jsx)(u.IN,{type:"text",name:"name",onChange:r,onBlur:t,value:s.name,className:i.searchFormInput}),(0,o.jsx)("button",{type:"submit",disabled:a,className:i.searchFormBtn,children:"Search"}),(0,o.jsxs)(u.IN,{name:"onlyFriends",as:"select",children:[(0,o.jsx)("option",{value:"null",children:"All"}),(0,o.jsx)("option",{value:"true",children:"Only followed"}),(0,o.jsx)("option",{value:"false",children:"Only unfollowed"})]})]})}}))),p=e=>(0,o.jsxs)("section",{className:i.users,children:[(0,o.jsx)(a,{overall:e.overall,pageSize:e.pageSize,currentPage:e.currentPage,setCurrentPageUsers:e.setCurrentPageUsers,portionSize:3}),(0,o.jsx)(c,{setFilterSearch:e.setFilterSearch,filter:e.filter}),(0,o.jsx)("ul",{className:i.usersBox,children:e.usersList.map((s=>(0,o.jsxs)("li",{className:i.user,children:[(0,o.jsx)(l.Af,{to:"/profile/"+s.id,children:(0,o.jsx)("img",{src:"https://icones.pro/wp-content/uploads/2021/04/icone-sourire-violet.png",alt:"MyProfile"})}),(0,o.jsx)("p",{children:s.name}),s.followed?(0,o.jsx)("button",{onClick:()=>e.unfollow(s.id),disabled:e.inProgress.some((e=>e===s.id)),children:"Unfollow"}):(0,o.jsx)("button",{onClick:()=>e.follow(s.id),disabled:e.inProgress.some((e=>e===s.id)),children:"Follow"})]},s.id)))})]});var h=r(2604),d=r(9732),g=r(5692),m=r(7076),f=r(5773),_=r(3275);const x=e=>e.users.overall,S=e=>e.users.pageSize,F=e=>e.users.currentPage,j=e=>e.users.isFetching,U=e=>e.users.inProgress,P=e=>e.users.filter,v=(0,_.M3)((e=>e.users.usersList),(e=>e.filter((e=>e))));class w extends n.Component{constructor(){super(...arguments),this.setCurrentPageUsers=e=>{this.props.getUsersThunk(e,this.props.pageSize,this.props.filter.term,this.props.filter.onlyFriends)},this.setFilterSearch=(e,s)=>{this.props.getUsersThunk(1,this.props.pageSize,e,s,!0)}}componentDidMount(){this.props.getUsersThunk(this.props.currentPage,this.props.pageSize,this.props.filter.term,this.props.filter.onlyFriends)}render(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(h.c,{isFetching:this.props.isFetching}),(0,o.jsx)(p,{overall:this.props.overall,pageSize:this.props.pageSize,currentPage:this.props.currentPage,usersList:this.props.usersList,setCurrentPageUsers:this.setCurrentPageUsers,follow:this.props.follow,unfollow:this.props.unfollow,inProgress:this.props.inProgress,setFilterSearch:this.setFilterSearch,filter:this.props.filter})]})}}const B=(0,f.Jn)((0,t.Ul)((e=>({usersList:v(e),overall:x(e),pageSize:S(e),currentPage:F(e),isFetching:j(e),inProgress:U(e),filter:P(e)})),{follow:d.Se,unfollow:d.UV,getUsersThunk:d.EN,setCurrentPage:d.wj.setCurrentPage}),g.A,m.A)(w)}}]);
//# sourceMappingURL=139.6356debe.chunk.js.map