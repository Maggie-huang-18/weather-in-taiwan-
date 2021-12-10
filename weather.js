
var app= new Vue({
    el:'#app',
    data:{
        data:[
          
        ],

        nowDay: '',
        nowTime: '',
        hournow:'',
        hournowm:'',
        hournows:'',


        nowWeek:'',
        nowWeekday:'',
        tomorrow:'',
        tomorrow1:'',
        tomorrow2:'',
        tomorrow3:'',
        tomorrow4:'',
        tomorrow5:'',
        hh:'',
        mm:'',
        cleartime:null,
        stop:null,



        locationName:[],
        currentLocation :'臺北市',
        ww:[
          
        ],
 
 
    },
    
    

    //現在時間
    methods: {
      
      handleClick(){
        this.cleartime= window.setInterval(()=>{
          this.Click();                                          
        },1000)
                
                
                        
                     
        
      },
      
      
      
      

      
      


      
      Click(){
        const vm=this;
        console.log(this.hh)
        console.log(this.mm)
        

        // console.log(this.mm)
        if((this.mm==this.hournowm) && (this.hh==this.hournow)) {
          const vm=this;
          
          
          alert('現在時間'+this.nowDay+this.nowTime+"快來看看今天天氣哦!");
          
        }
        else
        return vm.data;
       

       
      },


     
        getUniqueList(){
            const locationName = new Set();
            const ww = new Set();

            const vm = this;
            vm.data.forEach((item,i) =>{
                locationName.add(item.locationName)
                ww.add(item.locationName)


                // ww.add(item.weatherElement[14].time[0].elementValue.value)


            })
            console.log(locationName)
            console.log(ww)


            vm.locationName=Array.from(locationName);
            vm.ww=Array.from(ww);


        },
          timeFormate(timeStamp) {
            let newdate = new Date(timeStamp);
            let week = ['日', '一', '二', '三', '四', '五', '六'];
            
            let year  = newdate.getFullYear();
            let month = newdate.getMonth() + 1 < 10? "0" + (newdate.getMonth() + 1): newdate.getMonth() + 1;
            let date  = newdate.getDate() < 10? "0" + newdate.getDate(): newdate.getDate();
            let hh    = newdate.getHours() < 10? "0" + newdate.getHours(): newdate.getHours();
            let mm    = newdate.getMinutes() < 10? "0" + newdate.getMinutes(): newdate.getMinutes();
            let ss    = newdate.getSeconds() < 10? "0" + newdate.getSeconds(): newdate.getSeconds();
            let weeks = newdate.getDay(); //2
            let weeks1 = newdate.getDay()+1 < 7? "0"+newdate.getDay()+1+(-7):newdate.getDay()+1+(-7); //明天  3
            let weeks2 = newdate.getDay()+2 < 7? "0"+newdate.getDay()+2+(-7):newdate.getDay()+2+(-7); //後天  4
            let weeks3 = newdate.getDay()+3 < 7? "0"+newdate.getDay()+3+(-7):newdate.getDay()+3+(-7); //大厚天  5
            let weeks4 = newdate.getDay()+4 < 7? "0"+newdate.getDay()+4+(-7):newdate.getDay()+4+(-7);  //大大厚天  6
            let weeks5 = newdate.getDay()+5 < 7? "0"+newdate.getDay()+5+(-7):newdate.getDay()+5+(-7); //大大大厚天  7
            let weeks6 = newdate.getDay()+6 < 7? "0"+newdate.getDay()+6+(-7):newdate.getDay()+6+(-7); //大大大大厚天  1


            
            
         

            
    
            this.nowTime = hh+":"+mm + ":" + ss;
            this.nowDay = year + "年" + month + "月" + date +"日";
            this.hournow= hh;
            this.hournowm= mm;



            this.nowWeek= week[weeks]; //4
            this.tomorrow=week[weeks1]; //5
            this.tomorrow1=week[weeks2]; //6
            this.tomorrow2=week[weeks3]; //7
            this.tomorrow3=week[weeks4]; //1
            this.tomorrow4=week[weeks5]; //1
            this.tomorrow5=week[weeks6]; //1


            
            



    
            
         },
          // 定時器函數
          nowTimes(){        
            let self = this;
            self.timeFormate(new Date());
            setInterval(function(){
              self.timeFormate(new Date());
            }, 1000);
          },
      },
    computed:{
        filiterData(){ //也可以等於filiterData()
          const vm =this
          let items=[];
          if(vm.currentLocation !==''){
            items=vm.data.filter((item,i) =>{
              console.log(item)
              return item.locationName == vm.currentLocation
              
            })


          }else{
          
            items = vm.data
          }
          console.log(items)
          

          //console.log(vm.data)
          return items
                       
        
            
        },
        

    },
      // 創建完成時
      created() {
        this.nowTimes();
      },
      // 掛載完成時
      mounted(){
        this.nowTimes();
      },
      //現在時間
      

    created(){
        const vm=this;
        axios.get(`https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=${'CWB-D6E45BDB-A132-45A6-A2DD-19D90A372D20'}&downloadType=WEB&format=JSON`)
          .then(function (response) {
           console.log(response);
           console.log(this);
           vm.data=response.data.cwbopendata.dataset.locations.location //定義api
           

           console.log(vm.data)
           vm.getUniqueList()
        })
          .catch(function (error) {
           console.log(error);
        });

        setInterval(()=>{
          axios.get(`https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=${'CWB-D6E45BDB-A132-45A6-A2DD-19D90A372D20'}&downloadType=WEB&format=JSON`)
          .then(function (response) {
           console.log(response);
           console.log(this);
           vm.data=response.data.cwbopendata.dataset.locations.location //定義api
           

           console.log(vm.data)
           vm.getUniqueList()
        })
          .catch(function (error) {
           console.log(error);
        });

        },60000)
        //axios.get(`https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=${'CWB-D6E45BDB-A132-45A6-A2DD-19D90A372D20'}&downloadType=WEB&format=JSON`)
        
       
    },
    
})






