// /* eslint-disable jsx-a11y/img-redundant-alt */
// /* eslint-disable react/jsx-no-target-blank */
// import React from "react";

// function InterviewEmailTemp() {
//   return (
//     <>
//       <body>
//         <div class="candidate-evaluation-summary-r">
//           <div class="candidate-evaluation-summary-r1">
//             <div class="candidate-evaluation-summary-r2">
//               <div class="candidate-evaluation-summary-e">
//                 <b class="candidate-evaluation-summary1">
//                   Candidate Evaluation Summary
//                 </b>
//                 <div class="evaluated-by-taizoin">
//                   <div class="evaluated-by">Evaluated by</div>
//                   <img
//                     class="taizo-logo-icon"
//                     src="data:image/svg+xml;base64,{{taizoLogo}}"
//                   />
//                 </div>
//               </div>
//               <div class="name-position-looking-for-age">
//                 <div class="name-position-looking-for-age1">
//                   <img
//                     class="avatar-profile-picture-icon"
//                     alt=""
//                     src="data:image/svg+xml;base64,{{avatarProfilePic}}"
//                   />

//                   <div class="name-position-looking-for-age2">
//                     <div class="name-position-looking-for">
//                       <b class="mr-p-umasankar">
//                         {/* {{ candidate_name }} */}
//                         candidate_name
//                       </b>
//                       <div class="position-looking-for-age">
//                         <img
//                           class="job-icon"
//                           alt=""
//                           src="data:image/svg+xml;base64,{{jobicon}}"
//                         />

//                         <div class="quality-assurance-manager">
//                           {/* {{ looking_for }} */}
//                           looking_for
//                         </div>
//                       </div>
//                     </div>
//                     <div class="age4">
//                       <div class="evaluated-by">Age</div>
//                       <div class="evaluated-by">-</div>
//                       <div class="years2">
//                         {/* {{ age }} */}
//                         age Years
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div class="taizos-suggestion3">
//                 <div class="taizos-suggestion4">
//                   <b class="mr-p-umasankar">Taizo’s suggestion</b>
//                   <div class="the-candidate-has">
//                     {/* {{!-- The candidate has an extensive industry knowledge beginning from
//                             shop floor activities to MIS reports maintenance. --}} */}
//                     {/* {taizo_suggestion} */}
//                     taizo_suggestion
//                   </div>
//                 </div>
//                 <div class="score">
//                   <img
//                     class="score-green-badge-icon"
//                     alt=""
//                     src="data:image/svg+xml;base64,{{scoreGreenBadge}}"
//                   />

//                   <div class="score1">
//                     <div class="evaluated-by">Score</div>
//                     <div class="score-values">
//                       <b class="b">
//                         {/* {{ taizo_score }} */}
//                         taizo_score
//                       </b>
//                       <b class="b">/</b>
//                       <b class="b2">10</b>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div class="candidate-other-details">
//                 <div class="years-of-experience4">
//                   <div class="flag-icon">
//                     <div class="flag-line"></div>
//                     <img
//                       class="flag-icon-child"
//                       alt=""
//                       src="data:image/svg+xml;base64,{{polygon}}"
//                     />
//                   </div>
//                   <div class="years-of-experience5">
//                     <b class="mr-p-umasankar">Qualification</b>
//                     <div class="assistant-manager-quality">
//                       {" "}
//                       {/* {{ qualification }} */}
//                     </div>
//                   </div>
//                 </div>
//                 <div class="years-of-experience4">
//                   <div class="flag-icon">
//                     <div class="flag-line"></div>
//                     <img
//                       class="flag-icon-child"
//                       alt=""
//                       src="data:image/svg+xml;base64,{{polygon}}"
//                     />
//                   </div>
//                   <div class="years-of-experience5">
//                     <b class="mr-p-umasankar">Years of Experience</b>
//                     <div class="assistant-manager-quality">
//                       {" "}
//                       {/* {{ years_of_experience }} Years */}
//                       years_of_experience Years
//                     </div>
//                   </div>
//                 </div>
//                 <div class="years-of-experience4">
//                   <div class="flag-icon">
//                     <div class="flag-line"></div>
//                     <img
//                       class="flag-icon-child"
//                       alt=""
//                       src="data:image/svg+xml;base64,{{polygon}}"
//                     />
//                   </div>
//                   <div class="years-of-experience5">
//                     <b class="mr-p-umasankar">Previous Designation</b>
//                     <div class="assistant-manager-quality">
//                       {{ previous_designation }}
//                     </div>
//                   </div>
//                 </div>
//                 <div class="years-of-experience4">
//                   <div class="flag-icon">
//                     <div class="flag-line"></div>
//                     <img
//                       class="flag-icon-child"
//                       alt=""
//                       src="data:image/svg+xml;base64,{{polygon}}"
//                     />
//                   </div>
//                   <div class="core-skill-set-matching-jd5">
//                     <b class="mr-p-umasankar">Core skill-set matching JD</b>
//                     <div class="assistant-manager-quality">
//                       <ul class="apqp-ppap-documentation-and">
//                         {core_skill_set_matching_jd.map((item, index) => (
//                           <li key={index} className="apqp-ppap">
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="years-of-experience4">
//                   <div class="flag-icon">
//                     <div class="flag-line"></div>
//                     <img
//                       class="flag-icon-child"
//                       alt=""
//                       src="data:image/svg+xml;base64,{{polygon}}"
//                     />
//                   </div>
//                   <div class="core-skill-set-matching-jd5">
//                     <b class="mr-p-umasankar">Skills</b>
//                     <div class="assistant-manager-quality">
//                       {/* {{!-- MIS, SPC, JDE Edwards, SAP- MM, QA module, EHS incharge, FLL
//                                 award winner --}} */}

//                       {{ skills }}
//                     </div>
//                   </div>
//                 </div>
//                 {certifications && (
//                   <div class="years-of-experience4">
//                     <div class="flag-icon">
//                       <div class="flag-line"></div>
//                       <img
//                         class="flag-icon-child"
//                         alt=""
//                         src="data:image/svg+xml;base64,{{polygon}}"
//                       />
//                     </div>
//                     <div class="core-skill-set-matching-jd5">
//                       <b class="mr-p-umasankar">Certifications</b>
//                       <div class="certifications-detail-1-container">
//                         <ul className="apqp-ppap-documentation-and">
//                           {certifications.map((item, index) => (
//                             <li key={index} className="apqp-ppap">
//                               {item}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div class="wwwtaizoin">www.taizo.in</div>
//           </div>
//           <img
//             class="taizo-logo-watermark-icon"
//             alt=""
//             src="data:image/svg+xml;base64,{{taizologoWatermark}}"
//           />
//         </div>
//       </body>
//     </>
//   );
// }

// export default InterviewEmailTemp;
