"use strict";(self.webpackChunkfried_potato=self.webpackChunkfried_potato||[]).push([[938],{938:(t,i,e)=>{e.r(i),e.d(i,{default:()=>S});var s=e(7076),n=e(5773),r=e(624),a=e(104),o=e(9060);const l="Settings_settingsBox__iKpgv",h="Settings_warning__bnW7P",d="Settings_warn__fZR1m",g="Settings_hideWarn__pWMc0",p="Settings_fieldForm__Rtq1-",c="Settings_fieldLabel__cTpvZ";var u=e(9464),m=e(400),b=e(892),f=e(2496);const _=[["lookingForAJob","Looking for a job",!0],["lookingForAJobDescription","Description"],["fullName","Full name"],["aboutMe","About me"],["github","GitHub"],["instagram","Instagram"],["twitter","Twitter"]],w=(0,u.c)({form:"settings_data"})((t=>(0,f.jsxs)("form",{onSubmit:t.handleSubmit,className:p,children:[(0,f.jsx)("h3",{children:"Profile Settings"}),_.map(((t,i)=>(0,f.jsx)("label",{className:c,children:(0,m.c)(t[0],t[1],[b.ai],t[2])},i))),(0,f.jsx)("button",{type:"submit",children:"Submit"})]})));var W=e(264),v=e.n(W);class x extends o.Component{constructor(t){super(t),this.setWarning=()=>{this.setState((t=>({warning:!t.warning})))},this.setHideWarning=()=>{this.setState((t=>({hideWarning:!t.hideWarning})))},this.state={warning:!1,hideWarning:!1,form:!1},this.setWarning=this.setWarning.bind(this),this.setHideWarning=this.setHideWarning.bind(this)}componentDidUpdate(){this.state.warning||this.setWarning()}render(){return(0,f.jsxs)("ul",{className:l,children:[(0,f.jsxs)("p",{className:v()(h,{[d]:this.state.warning,[g]:this.state.hideWarning}),children:[(0,f.jsx)("span",{onClick:this.setHideWarning,children:"X"}),"Picture has been replaced!"]}),this.props.ownId===this.props.uploadedId?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("li",{children:(0,f.jsx)("input",{onChange:t=>{t.target.files&&this.props.savePhoto(t.target.files[0])},type:"file",placeholder:"Change profile photo"})}),(0,f.jsx)("li",{children:(0,f.jsx)(w,{...this.props,onSubmit:t=>{this.props.saveProfile({...t,contacts:{twitter:t.twitter,instagram:t.instagram,github:t.github}})}})})]}):"Switch to your account (Go to profile and come back)"]})}}const S=(0,n.Jn)((0,r.Ul)((t=>{var i,e;return{ownId:t.auth.id,uploadedId:null===(i=t.profile.profileUser)||void 0===i?void 0:i.userId,payload:null===(e=t.profile.profileUser)||void 0===e?void 0:e.photos}}),{savePhoto:a.Eb,saveProfile:a.BV}),s.A)(x)}}]);
//# sourceMappingURL=938.9dd81a10.chunk.js.map