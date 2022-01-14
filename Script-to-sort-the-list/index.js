
function sortList(){
   var list, switching, shouldSwitch,i, listItems;

   list = document.getElementById("myId");
   switching = true;

   while(switching){
       switching = false;
       listItems = document.getElementsByTagName("li");
       
       for(i = 0;i < listItems.length-1;i++){
           shouldSwitch = false;
           if(listItems[i].innerText > listItems[i+1].innerText){
                shouldSwitch = true;
                break;
           }
       }
       listItems[i].parentNode.insertBefore(listItems[i+1],listItems[i]);
       switching = true;
   }

}