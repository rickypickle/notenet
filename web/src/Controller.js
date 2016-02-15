Controller = {
    buttonListener: function(){ // listen to buttons 
        $('.createNote').on('click', function(){
            // if create note button is clicked we take values from 
            // text inputs 'note content', 'note tags', and 'attach to story'
            
            var noteAdded = false;
            var storyAttached = false;
            var hasTags = false;
            
            var noteContent = $('.noteContent').val();
            var noteTags = $('.noteTags').val().toLowerCase().split(' ');
            var story = $('.newStoryAttach').val();
            
            // at some point we will have to add a function to create a unique story hash,
            // also we will have to check if story name exists and prompt user to crete anyway or merge
            // for now we create a simple note name
            var noteName = noteContent.substr(0, 15) + story;
            
            console.log ("tags: " + noteTags.length + noteTags);
            
            // clear the text input fields
            $('.noteContent').val('');
            $('.noteTags').val('');
            $('.newStoryAttach').val('');
            
            // create note object
            var note = {noteContent: noteContent, tags: noteTags, attachedTo:[]};
            
            // check if story exists
            if (Model.Stories[story] == undefined){
                // story does not exist so we create and add this note
                Model.Stories[story] = {notes:[], tags:{}};
            }
            // add story to 'attachedTo' in note object
            if (story != ""){
                note.attachedTo.push(story);
                storyAttached = true;
            }
            else{
                window.alert("Enter Story to attach to")
            }
            
            
            if (noteContent != ""){
                // add note to story
                Model.Stories[story].notes.push(note);
                noteAdded = true;
                
                // now we add the note to the note storage object
                Model.Notes[noteName] = note;
            }
            else{
                window.alert("Note must have content")
            }
            
            
            
              //  console.log("assoc arr " + Model.Stories[story].notes[0].tags)
                
            // now we modify the story's tags according to the note's tags
            var n = noteTags.length;
            console.log ("n = " + n + "_" + noteTags);
            if (n > 0){ // check for tags
                for (i = 0; i < n; i++){
                    if (Model.Stories[story].tags[noteTags[i]] == undefined){ // if this is a new tag
                        Model.Stories[story].tags[noteTags[i]] = 1; // we add a weight of 1 to this tag
                        console.log("new tag " + Model.Stories[story].tags[noteTags[i]]);
                    }
                    else{ // tag exists so increment count by 1
                        Model.Stories[story].tags[noteTags[i]]++;
                       // console.log("incrememnt tag " + Model.Stories[story].tags[noteTags[i]]);
                    }
                }    
                hasTags = true;
            }
            else{
                window.alert("Note must have tags.")
            }
            
        
            for (var key in Model.Stories[story].tags){ // way to loop through array of tags and view key and value
               // console.log(Model.Stories[story].tags[key] + "_" + key);
            }
            
            // rebuild the story and note list view
            View.listStories();
            View.listNotes();
            Controller.activateListListeners();
            
            // if everything has been added correctly, we alert the user as such and close the window
            if ((hasTags) && (storyAttached) && (noteAdded)){
                window.alert("Note " + noteName + "successfully added to story " + story);
                $('.CreateNote').hide();
            }
                        
        });
        
        $('.createStory').on('click', function(){
            console.log("story create")
            // create new story
            var story = $('.storyTitle').val();
            $('.storyTitle').val('');
            // check if story exists
            if (Model.Stories[story] == undefined){
                // story does not exist so we create and add this note
                Model.Stories[story] = {notes:[], tags:{}};
                $('.CreateStory').hide();
                window.alert(story + "created");
                
                // rebuild the story and note list view
                View.listStories();
                Controller.activateListListeners();
            }
            else{
                window.alert("Story already exists");
            }
            
        });       
        
        
        // close note create dialog
        $('.cancelNote').on('click', function(){
           $('.CreateNote').hide(); 
        });
        // close story create dialog
        $('.cancelStory').on('click', function(){
           $('.CreateStory').hide(); 
        });
        
    },
    
    buildStoryList: function(){
        for (var key in Model.Stories){
            var listElement = $('.storyListElement').clone();
            listElement.html(key);
            $('.StoryList').append(listElement);
        }
    },
    
    activateListListeners: function(){
        $('.noteListElement').on('click', function(){
               // when we click a note we want to get the notes id, gather relevant data from the model
                // and pass it to the view to be presented
                var noteID = $(this).attr('id');
                console.log(noteID+"_")
                View.displayNote(noteID);
        });
        $('.storyListElement').on('click', function(){
               // when we click a note we want to get the notes id, gather relevant data from the model
                // and pass it to the view to be presented
                var storyID = $(this).attr('id');
                console.log(storyID+"_")
                View.displayStory(storyID);
        });
    }
    
    
}