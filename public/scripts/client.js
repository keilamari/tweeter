/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  
  //to prevent cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = () => {
    $.ajax({
      url:'/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    })
  }
  
  loadTweets();
  
  // loops through tweets and calls createTweetElement to construct each tweet
  const renderTweets = function(tweets) {
    const $container = $('#tweets-container');
    $container.empty();
    for (const single of tweets) {
      const $tweet = createTweetElement(single);
      $container.prepend($tweet);
    }
  }
  
  //construct the tweet
  const createTweetElement = function(data) {
    let $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src='${escape(data.user.avatars)}'> &nbsp;
          ${escape(data.user.name)}
        </div>
        <div>${escape(data.user.handle)}</div>
      </header>
      <p>${escape(data.content.text)}</p>
      <footer>
        <div>${escape(timeago.format(data.created_at))}</div> 
        <div><i id='flag' class="fa-solid fa-flag"></i>  <i id='retweet' class="fa-solid fa-retweet"></i>  <i id='heart' class="fa-solid fa-heart"></i></div>
      </footer>
    </article>`);
    return $tweet;
  }
  
  const $form = $('form');
  
  $form.on('submit', function(event){
    event.preventDefault();
    const serializedData = $(event.target).serialize();
    if(serializedData.substring(5) === "" || serializedData.substring(5) === null) {
      document.getElementById('error1').hidden = false;
      document.getElementById('error2').hidden = true;
    } else if (serializedData.length > 145) {
      document.getElementById('error2').hidden = false;
      document.getElementById('error1').hidden = true;
    } else{
      $.post('/tweets', serializedData, (response) => {
        loadTweets();
        //reset text area upon successful post
        document.getElementById('tweet-text').value = '';
        //reset counter to 140 upon successful post
        document.getElementsByClassName('counter')[0].innerText = 140;
      })  
    }
  })
});