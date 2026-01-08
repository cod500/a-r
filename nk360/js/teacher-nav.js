    //Custom for each page active state
 (function($){
   const $navWrap  = $('nav.sideNav.home-nav[data-nav="overview"]');
   const $collapse = $('#navbarSupportedContent');
   let primedOnce  = false; 
 
   $('#nav-icon4').on('click.forceOpenOnce', function(){
     const aboutToOpen = !$collapse.is(':visible'); 
     if (aboutToOpen && !primedOnce) {
       // remove the inline "display:none" your code added to all .dropdown-links
       ['#nav-lessons','#nav-vocab','#nav-close','#nav-additional'].forEach(sel=>{
         const el = document.querySelector(sel);
         if (el) el.style.removeProperty('display');
       });
       // add the scoped class so CSS shows them on first open
       $navWrap.addClass('force-open-teachers');
       primedOnce = true;
     }
   });
 
   // Any interaction with that group stops forcing it open (so user can freely toggle)
   $('#for-steachers-dropdown, #nav-lessons a, #nav-vocab a, #nav-close a, #nav-additional a')
     .on('click', function(){
       $navWrap.removeClass('force-open-teachers');
     });
 
 })(jQuery);

 

  if ($('.teacher-nav').length) {
 $('#for-steachers-dropdown .flip-arrow').addClass('is-open');
  $('#nav-lessons').show();
}
