View = {
    navigation: function(){
        $('.MenuNav').on('click', function(){
            console.log($(this).html());
            if ($(this).html() == "stories"){ 
                $('.StoryList').show(); 
                $('.NoteList').hide();    
                $('.Discover').hide();
                
                View.listStories();
            }
            else if ($(this).html() == "notes"){$('.StoryList').hide(); $('.NoteList').show(); $('.Discover').hide();}
            else if ($(this).html() == "discover"){$('.StoryList').hide(); $('.NoteList').hide(); $('.Discover').show();}
        });
    },
    actionBar: function(){
        $('.newStory').on('click', function(){
            $('.CreateStory').show();
            $('.CreateNote').hide();
        });
        $('.newNote').on('click', function(){
            $('.CreateStory').hide();
            $('.CreateNote').show();
        });
        
    },
    listNotes: function(){
         // make clones of title and list elements
        var title = $('.noteListTitle').clone();
        // empty the div
        $('.NoteList').empty();
        
        
        // add the title
        $('.NoteList').append(title);
        
        for (var key in Model.Notes){ // now iterate through list of stories, 
                                        //create a div element for each and append to list
            var newElement = $('#ntTemp').clone();
            newElement.attr('id', key);
            $('.NoteList').append(newElement);
            var id = "#"+newElement.attr('id')+"";
            $(id).html(key);
            $(id).css("display", "block");
        }
    },
    
    listStories: function(){
        // make clones of title and list elements
        var title = $('.storyListTitle').clone();
         // empty the div
        $('.StoryList').empty();
        
        // add the title
        $('.StoryList').append(title);
       
        for (var key in Model.Stories){ // now iterate through list of stories, 
                                        //create a div element for each and append to list
            var newElement = $('#stTemp').clone();
            newElement.attr('id', key);
            $('.StoryList').append(newElement);
            var id = "#"+newElement.attr('id')+"";
            $(id).html(key);
            $(id).css("display", "block");
        }
    },
    
    displayNote: function(id){
        // Model.Notes[x] contains fields noteContent, attachedTo, tags
        var note = Model.Notes[id];
        console.log(note.tags)
    },
    
    displayStory: function(id){
        // Model.Stories[x] contains fields notes, tags
        var story = Model.Stories[id];
        console.log(story.tags)
    }
};