define(["util"],function(a){var b=function(a){return this.category=a.category,{category:this.category}};b.prototype={category:"默认分类"};var c=function(a){return this.category=a.category,this.taskList=a.taskList,{category:this.category,taskList:this.taskList}};c.prototype={category:b.prototype.category,taskList:"使用说明"};var d=function(a){return this.id=0,this.cateList=a.cateList,this.title=a.title,this.time=a.time,this.content=a.content,this.isDone=a.isDone,{id:this.id,cateList:this.cateList,title:this.title,time:this.time,content:this.content,isDone:this.isDone}};d.prototype={id:0,cateList:c.prototype,title:"Welcome to ToDo",time:new Date(2015,0,1),content:'Nice to meet U !  欢迎使用 ToDo 应用 ~ (๑•̀ㅂ•́)و✧<br><br><i class="fa fa-flag fa-fw"></i> [标题]：任务标题，不超过10个字<br><i class="fa fa-calendar fa-fw"></i> [时间]：格式为 [YYYY-MM-DD] ( 例：2015-01-01 )<br><i class="fa fa-check-square-o fa-fw"></i> [完成]：视为又有一个任务被KO啦<br><i class="fa fa-pencil-square-o fa-fw"></i> [编辑]：编辑任务标题、时间、内容<br><i class="fa fa-undo fa-fw"></i> [重置]：编辑状态时，可取消编辑，恢复原任务内容<br><i class="fa fa-check fa-fw"></i> [完成]：编辑状态时，为完成编辑<br><i class="fa fa-plus fa-fw"></i> [添加]：可以添加新分类或者添加新任务<br><i class="fa fa-smile-o fa-fw"></i> [笑脸]：标明该任务已完成 :)<br><i class="fa fa-trash-o fa-fw"></i> [删除]：删除选中的列表或分类，删除后不能恢复，请谨慎~',isDone:!0};var e=function(){var e=b.prototype,f=c.prototype,g=d.prototype,h=new b({category:"百度IFE项目"}),i=new c({category:h.category,taskList:"task0001"}),j=new c({category:h.category,taskList:"task0002"}),k=new c({category:h.category,taskList:"task0003"}),l=new d({cateList:i,title:"todo1",time:new Date(2015,3,1),content:"完成task0001作业",isDone:!0}),m=new d({cateList:i,title:"todo2",time:new Date(2015,3,20),content:"重构task0001作业",isDone:!1}),n=new d({cateList:j,title:"todo3",time:new Date(2015,3,25),content:"完成task0002作业",isDone:!0}),o=new d({cateList:j,title:"todo4",time:new Date(2015,4,5),content:"重构task0002作业",isDone:!1}),p=new d({cateList:k,title:"todo5",time:new Date(2015,4,25),content:"完成task0003作业",isDone:!0}),q=[e,h],r=[f,i,j,k],s=[g,l,m,n,o,p];return a.each(s,function(a,b){a.id=b}),{tasks:s,lists:r,cates:q}}(),f=function(a){try{if(window.localStorage){var b=window.localStorage;if(!b.getItem(a))switch(a){case"cates":return b.setItem("cates",JSON.stringify(e.cates)),JSON.parse(b.getItem("cates"));case"lists":return b.setItem("lists",JSON.stringify(e.lists)),JSON.parse(b.getItem("lists"));case"tasks":return b.setItem("tasks",JSON.stringify(e.tasks)),JSON.parse(b.getItem("tasks"))}return JSON.parse(b.getItem(a))}}catch(c){console.log(c)}},g=function(a,b){try{if(window.localStorage){var c=window.localStorage;if(c.getItem(a))switch(a){case"cates":c.setItem("cates",JSON.stringify(b));break;case"lists":c.setItem("lists",JSON.stringify(b));break;case"tasks":c.setItem("tasks",JSON.stringify(b))}}}catch(d){console.log(d)}},h=function(a,b,c){g("cates",a),g("lists",b),g("tasks",c)};return{Category:b,TaskList:c,TaskDetail:d,tasks:f("tasks"),lists:f("lists"),cates:f("cates"),getData:f,setData:g,updateData:h}});