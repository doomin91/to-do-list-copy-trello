import Vue from "vue"; 

import { library } from "@fortawesome/fontawesome-svg-core"; 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; 

import { faAddressCard, faLink, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons"; 
import { faTrashAlt, faSquare , faStar, faBell, faPlusSquare, faNoteSticky, faListAlt, faBookmark, faBarChart, faEdit} from "@fortawesome/free-regular-svg-icons"; 
library.add(faAddressCard, faLink, faRedo, faUndo);
library.add(faTrashAlt, faSquare, faStar, faBell, faPlusSquare, faNoteSticky, faListAlt, faBookmark, faBarChart, faEdit); 

//eeeeeeeeeeeeieeieijrjksljdifjsoejrlisje
Vue.component("font-awesome-icon", FontAwesomeIcon);
