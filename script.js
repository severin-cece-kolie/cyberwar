// CyberShield Academy v2 — interactions, progression, quiz and accessibility

const threats=[
{icon:"✉",title:"Phishing",desc:"Des messages frauduleux cherchent à vous faire cliquer ou transmettre des informations.",body:"Le phishing imite souvent une banque, un fournisseur, un collègue ou le service informatique. Analysez l'expéditeur, le contexte et le domaine avant toute action.",tips:["Ne cliquez pas sous pression.","Vérifiez le domaine réel.","Signalez les messages suspects."]},
{icon:"▣",title:"Ransomware",desc:"Un logiciel malveillant chiffre les fichiers et peut bloquer des ressources critiques.",body:"Le ransomware peut se propager rapidement. Les mises à jour, sauvegardes et contrôles d'accès limitent son impact.",tips:["Maintenez les systèmes à jour.","Utilisez des sauvegardes fiables.","Alertez rapidement l'équipe sécurité."]},
{icon:"◉",title:"Malware",desc:"Un logiciel malveillant peut espionner, voler, détruire ou perturber un système.",body:"Les malwares peuvent arriver par une pièce jointe, un téléchargement, un site compromis ou un support amovible.",tips:["Téléchargez depuis des sources fiables.","N'installez pas de logiciel inconnu.","Gardez les protections actives."]},
{icon:"♟",title:"Ingénierie sociale",desc:"La manipulation psychologique contourne les contrôles en jouant sur la confiance ou l'urgence.",body:"Un attaquant peut se faire passer pour un dirigeant, un technicien ou un partenaire pour obtenir une action inhabituelle.",tips:["Vérifiez les demandes inhabituelles.","Confirmez via un autre canal.","Respectez les procédures."]},
{icon:"⌑",title:"Vol de mots de passe",desc:"Des identifiants peuvent être devinés, réutilisés, volés ou récupérés après une fuite.",body:"La réutilisation d'un mot de passe amplifie l'impact d'une fuite. Un secret unique associé à la MFA réduit le risque.",tips:["Un mot de passe unique par service.","Préférez une phrase longue.","Activez la MFA."]},
{icon:"⇩",title:"Fuite de données",desc:"Des informations sensibles peuvent être exposées par erreur ou après une compromission.",body:"Une mauvaise configuration, un partage excessif ou un compte compromis peuvent provoquer une exposition de données.",tips:["Partagez uniquement le nécessaire.","Vérifiez les destinataires.","Signalez toute exposition."]},
{icon:"⌁",title:"Wi-Fi non sécurisé",desc:"Un réseau public ou mal protégé augmente les risques lors des communications.",body:"Les réseaux inconnus sont moins maîtrisés. Évitez les opérations sensibles et utilisez les protections de l'entreprise.",tips:["Préférez un réseau de confiance.","Utilisez le VPN professionnel.","Évitez les opérations sensibles."]},
{icon:"▤",title:"USB malveillante",desc:"Une clé inconnue peut contenir un malware ou servir à exfiltrer des données.",body:"Un support trouvé ou reçu sans contexte doit être considéré comme non fiable.",tips:["Ne branchez jamais une clé inconnue.","Remettez-la au service IT/sécurité.","Utilisez les supports autorisés."]}
];
const grid=document.getElementById("threatGrid");
grid.innerHTML=threats.map((t,i)=>`<article class="threat-card reveal" data-threat="${i}" tabindex="0"><span class="threat-index">0${i+1}</span><div class="threat-icon">${t.icon}</div><h3>${t.title}</h3><p>${t.desc}</p><div class="threat-more">Découvrir la fiche →</div></article>`).join("");

const modal=document.getElementById("modal"),modalTitle=document.getElementById("modalTitle"),modalBody=document.getElementById("modalBody"),modalIcon=document.getElementById("modalIcon");
function openModal(title,icon,body,tips){modalTitle.textContent=title;modalIcon.textContent=icon;modalBody.innerHTML=`<p>${body}</p><p><strong>Comment se protéger ?</strong></p><ul>${tips.map(t=>`<li>${t}</li>`).join("")}</ul>`;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.querySelectorAll(".threat-card").forEach(c=>{const go=()=>{const t=threats[+c.dataset.threat];openModal(t.title,t.icon,t.body,t.tips)};c.onclick=go;c.onkeydown=e=>{if(e.key==="Enter")go()}});
document.getElementById("modalClose").onclick=closeModal;document.querySelector("[data-close-modal]").onclick=closeModal;document.onkeydown=e=>{if(e.key==="Escape")closeModal()};

const resources={
phishing:["Guide anti-phishing","Analysez l'expéditeur, le domaine, le contexte et la demande avant de cliquer. En cas de doute, signalez."],
password:["Guide mots de passe","Utilisez des mots de passe longs et uniques. Un gestionnaire peut faciliter leur gestion."],
mfa:["Guide MFA","La MFA ajoute une preuve supplémentaire d'identité. Activez-la dès qu'elle est disponible."],
mobile:["Sécurité mobile","Verrouillage, mises à jour, applications fiables et effacement à distance sont essentiels."],
remote:["Télétravail sécurisé","Utilisez les outils approuvés, le VPN professionnel et évitez les réseaux inconnus."],
incident:["Procédure incident","Stoppez l'action, conservez les éléments utiles et contactez rapidement le référent sécurité."]
};
document.querySelectorAll(".resource-card").forEach(c=>c.onclick=()=>{const r=resources[c.dataset.resource];openModal(r[0],"✓",r[1],["Consultez la procédure interne.","En cas de doute, demandez conseil au service sécurité."])});
document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>document.querySelector(b.dataset.scroll).scrollIntoView({behavior:"smooth"}));

const checklistItems=["Utiliser un mot de passe unique","Activer la MFA","Verrouiller son ordinateur","Faire les mises à jour","Vérifier les pièces jointes","Ne jamais partager ses identifiants","Utiliser un VPN sur les réseaux publics","Sauvegarder les données importantes","Signaler les incidents rapidement"];
document.getElementById("checklist").innerHTML=checklistItems.map((x,i)=>`<label class="check-item"><input type="checkbox" data-check="${i}"><span class="custom-check"></span><strong>${x}</strong></label>`).join("");
let practiceScore=Number(localStorage.getItem("cybershield_practice")||0),quizScore=Number(localStorage.getItem("cybershield_quiz")||0);
const checked=[...document.querySelectorAll("[data-check]")];checked.forEach((x,i)=>x.checked=i<practiceScore);

function updatePractice(){
 practiceScore=checked.filter(x=>x.checked).length;localStorage.setItem("cybershield_practice",practiceScore);
 const pct=Math.round(practiceScore/9*100),deg=pct*3.6;
 document.getElementById("checkScore").textContent=pct+"%";document.getElementById("checkBar").style.width=pct+"%";document.getElementById("checkScoreRing").style.background=`conic-gradient(var(--blue) ${deg}deg,rgba(255,255,255,.08) 0deg)`;document.getElementById("checkCount").textContent=`${practiceScore} / 9 bonnes pratiques`;
 document.getElementById("checkMessage").textContent=pct>=90?"Excellent niveau de protection":pct>=70?"Bon niveau de protection":pct>=40?"Protection à renforcer":"Commencez votre auto-évaluation";
 checked.forEach(x=>x.parentElement.classList.toggle("checked",x.checked));updateGlobal();
}
document.getElementById("checklist").onchange=updatePractice;

const questions=[
{q:"Vous recevez un email demandant de confirmer votre mot de passe via un lien. Que faites-vous ?",a:["Je clique immédiatement","Je réponds à l'email","Je vérifie l'expéditeur et l'URL avant toute action","Je transfère mon mot de passe"],c:2,e:"Vérifiez le contexte, l'expéditeur et le domaine avant toute action."},
{q:"Quel mot de passe est le plus sécurisé ?",a:["12345678","azerty2026","Moussa123","Une phrase longue et unique avec différents caractères"],c:3,e:"La longueur et l'unicité sont essentielles. Évitez les informations personnelles."},
{q:"Vous trouvez une clé USB inconnue dans les locaux. Que faites-vous ?",a:["Je la branche","Je la donne au service informatique / sécurité","Je la branche sur mon téléphone","Je la prête"],c:1,e:"Un support inconnu peut contenir un malware. Ne le branchez pas."},
{q:"Pourquoi activer la MFA ?",a:["Accélérer Internet","Ajouter une couche de protection","Supprimer l'antivirus","Éviter les mises à jour"],c:1,e:"La MFA ajoute une preuve supplémentaire d'identité."},
{q:"Vos fichiers semblent soudainement chiffrés et une rançon est demandée. Que faites-vous ?",a:["Je paie","Je continue à travailler","J'alerte rapidement l'IT/sécurité et suis la procédure","Je télécharge un outil au hasard"],c:2,e:"Traitez la situation comme un incident et alertez les équipes compétentes."},
{q:"Que faire sur un Wi-Fi public ?",a:["Désactiver les protections","Faire toutes les opérations sensibles","Utiliser les protections prévues, notamment le VPN","Partager ses identifiants"],c:2,e:"Les réseaux publics sont moins maîtrisés. Utilisez le VPN professionnel."},
{q:"Un collègue demande en urgence un fichier confidentiel depuis une nouvelle adresse. Que faites-vous ?",a:["Je l'envoie","Je vérifie son identité via un autre canal","Je le publie","Je demande son mot de passe"],c:1,e:"Confirmez les demandes inhabituelles par un canal indépendant."},
{q:"Une pièce jointe inattendue arrive d'un fournisseur connu. Que faites-vous ?",a:["Je l'ouvre","Je la transfère","Je vérifie le contexte et l'expéditeur","Je désactive l'antivirus"],c:2,e:"Même un contact connu peut être compromis. Vérifiez avant ouverture."},
{q:"Pourquoi installer rapidement les mises à jour de sécurité ?",a:["Changer la couleur","Corriger des vulnérabilités connues","Supprimer la MFA","Augmenter les droits"],c:1,e:"Les mises à jour corrigent notamment des failles exploitables."},
{q:"Une publication demande des informations sur les systèmes internes de votre entreprise. Que faites-vous ?",a:["Je donne les informations","Je publie une photo","Je ne partage pas d'informations sensibles et signale si nécessaire","Je donne les identifiants"],c:2,e:"Des informations apparemment anodines peuvent aider un attaquant."}
];
let current=0,locked=false;
const qNum=document.getElementById("questionNumber"),qLvl=document.getElementById("quizLevel"),qProg=document.getElementById("quizProgress"),qText=document.getElementById("quizQuestion"),qAns=document.getElementById("quizAnswers"),qFeed=document.getElementById("quizFeedback"),next=document.getElementById("nextQuestion");
function renderQuestion(){locked=false;const q=questions[current];qNum.textContent=`Question ${current+1} / 10`;qProg.style.width=`${(current+1)*10}%`;qLvl.textContent=`Niveau : ${current<3?"Débutant":current<7?"Intermédiaire":"Avancé"}`;qText.textContent=q.q;qAns.innerHTML=q.a.map((a,i)=>`<button class="answer" data-index="${i}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${a}</span></button>`).join("");qFeed.hidden=true;qFeed.className="quiz-feedback";next.disabled=true;next.textContent=current===9?"Voir mon résultat":"Question suivante →";document.getElementById("answerStatus").textContent="Sélectionnez une réponse";}
qAns.onclick=e=>{const b=e.target.closest(".answer");if(!b||locked)return;locked=true;const q=questions[current],idx=+b.dataset.index,good=idx===q.c;if(good)quizScore++;qAns.querySelectorAll(".answer").forEach((x,i)=>{x.disabled=true;if(i===q.c)x.classList.add("correct");if(i===idx&&!good)x.classList.add("wrong")});qFeed.hidden=false;qFeed.classList.add(good?"good":"bad");qFeed.innerHTML=`<strong>${good?"✓ Bonne réponse":"✕ Réponse incorrecte"}</strong><br>${q.e}`;next.disabled=false;document.getElementById("answerStatus").textContent=good?"Réponse validée":"Explication affichée";};
next.onclick=()=>{if(current<9){current++;renderQuestion()}else showResult()};
function showResult(){quizScore=Math.min(10,quizScore);localStorage.setItem("cybershield_quiz",quizScore);document.querySelector(".quiz-shell").style.display="none";const r=document.getElementById("quizResult");r.hidden=false;const pct=Math.round(quizScore/10*100);document.getElementById("resultScore").textContent=`${quizScore} / 10`;document.getElementById("resultPercent").textContent=pct+"%";document.getElementById("correctCount").textContent=quizScore;document.getElementById("wrongCount").textContent=10-quizScore;document.getElementById("resultLevel").textContent=pct>=90?"Expert en cybersensibilisation":pct>=70?"Bon niveau":pct>=50?"Niveau moyen":"Sensibilisation à renforcer";document.getElementById("resultCircle").style.background=`conic-gradient(var(--blue) ${pct*3.6}deg,#e8edf3 0deg)`;updateGlobal();r.scrollIntoView({behavior:"smooth",block:"center"})}
document.getElementById("restartQuiz").onclick=()=>{current=0;quizScore=0;localStorage.setItem("cybershield_quiz",0);document.querySelector(".quiz-shell").style.display="block";document.getElementById("quizResult").hidden=true;renderQuestion();updateGlobal()};

function updateGlobal(){
 const pct=Math.round((practiceScore/9*50)+(quizScore/10*50)),deg=pct*3.6;
 document.getElementById("globalPercent").textContent=pct+"%";document.getElementById("globalBar").style.width=pct+"%";document.getElementById("globalRing").style.background=`conic-gradient(var(--blue) ${deg}deg,#d3dee9 0deg)`;document.getElementById("globalMessage").textContent=pct>=90?"Excellent niveau":pct>=70?"Bon niveau de sensibilisation":pct>=50?"Niveau moyen":"À renforcer";
 document.getElementById("heroProgress").textContent=pct+"%";document.getElementById("heroProtection").textContent=pct+"%";document.querySelector(".dash-progress span").style.width=pct+"%";
}
document.getElementById("reportBtn").onclick=()=>openModal("Signaler un incident","!", "Cette démonstration est statique. Dans une entreprise réelle, utilisez le canal officiel prévu par la procédure de sécurité.",["Ne supprimez pas les emails, fichiers ou captures utiles.","Indiquez ce que vous avez fait et à quelle heure.","Ne tentez pas de réparer seul un appareil potentiellement compromis."]);
document.getElementById("menuToggle").onclick=()=>{const n=document.getElementById("navLinks"),b=document.getElementById("menuToggle");n.classList.toggle("open");b.setAttribute("aria-expanded",n.classList.contains("open"))};
document.querySelectorAll(".nav-links a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("open"));

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.07});document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
const sections=[...document.querySelectorAll("main section[id]")],navItems=[...document.querySelectorAll(".nav-links a[href^='#']")];
const sectionObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){navItems.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;document.getElementById("scrollProgress").style.width=(scrollY/h*100)+"%"});
renderQuestion();updatePractice();
