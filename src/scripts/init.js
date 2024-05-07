import state from "./state";
import Folder, {foldersDOM} from "./folders";


/* Initial load */
new Folder("General");
Folder.allFolders.get('General').addTodo("Todo first", "2024-04-05", "High");
Folder.allFolders.get('General').addTodo("Todo 2nd", "2024-04-05", "Low");
Folder.allFolders.get('General').addTodo("Test3", "2024-04-05", "Medium", true);
new Folder("Birthdays");
new Folder("Events");

state.active = 'General';

foldersDOM.populate();
