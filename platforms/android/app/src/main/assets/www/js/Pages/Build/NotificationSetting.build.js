define(["Platform/Core/Abstract/Screen","Module/Pages/NotificationSetting/build"],(Screen,Module)=>(class NotificationSetting extends Screen{constructor(application,container,_request){super(application,container,_request),this.template=Module.template,Module.viewModel.call(this)}}));