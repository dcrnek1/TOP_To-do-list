import state from "./state";
import Folder, {foldersDOM} from "./folders";


/* Initial load */
new Folder("General");
Folder.allFolders.get('General').addTodo("Test", "2024-04-05", "High");
Folder.allFolders.get('General').addTodo("Test2", "2024-04-05", "Low");
Folder.allFolders.get('General').addTodo("Test3", "2024-04-05", "Medium");
Folder.allFolders.get('General').addTodo("Test4", "2024-04-05", "Low");
new Folder("Birthdays");
new Folder("Events");

state.active = 'General';

foldersDOM.populate();
