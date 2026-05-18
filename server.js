const http = require('http');
const PORT = process.env.PORT || 3000;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema Financeiro & RH</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f5f5f3;
      --surface: #ffffff;
      --border: rgba(0,0,0,0.10);
      --border-md: rgba(0,0,0,0.18);
      --text: #1a1a18;
      --text-muted: #6b6b67;
      --text-hint: #9b9b96;
      --green: #1D9E75;
      --green-dark: #0F6E56;
      --green-light: #E1F5EE;
      --radius: 8px;
      --radius-lg: 12px;
    }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; font-size: 14px; }

    .header { background: var(--surface); border-bottom: 0.5px solid var(--border); padding: 1rem 1.5rem; display: flex; align-items: center; gap: 12px; }
    .header-logo { width: 38px; height: 38px; background: var(--green); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; flex-shrink: 0; }
    .header h1 { font-size: 17px; font-weight: 600; }
    .header p { font-size: 12px; color: var(--text-muted); }

    .nav { background: var(--surface); border-bottom: 0.5px solid var(--border); display: flex; padding: 0 1.5rem; overflow-x: auto; }
    .nav-btn { padding: 0.75rem 1.1rem; font-size: 13px; font-weight: 500; border: none; background: none; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap; transition: all .15s; }
    .nav-btn.active { color: var(--green-dark); border-bottom-color: var(--green); }
    .nav-btn:hover:not(.active) { color: var(--text); background: var(--bg); }

    .content { padding: 1.5rem; max-width: 1200px; margin: 0 auto; }
    .tab { display: none; }
    .tab.active { display: block; }

    .card { background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1rem; }
    .card-title { font-size: 15px; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
    .section-label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: .05em; margin: 1.25rem 0 .75rem; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 4px; }
    .form-group label { font-size: 12px; color: var(--text-muted); font-weight: 500; }
    .form-group input, .form-group select {
      font-size: 13px; padding: 8px 10px;
      border: 0.5px solid var(--border-md); border-radius: var(--radius);
      background: var(--surface); color: var(--text); width: 100%;
      transition: border-color .15s, box-shadow .15s;
    }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: var(--green); box-shadow: 0 0 0 3px rgba(29,158,117,.12); }
    .full-width { grid-column: 1 / -1; }

    .radio-group { display: flex; gap: 1.5rem; padding: 8px 0; }
    .radio-group label { font-size: 13px; display: flex; align-items: center; gap: 6px; cursor: pointer; }

    .btn { padding: 9px 18px; border-radius: var(--radius); font-size: 13px; font-weight: 500; cursor: pointer; border: 0.5px solid var(--border-md); background: var(--surface); color: var(--text); transition: all .15s; display: inline-flex; align-items: center; gap: 6px; }
    .btn:hover { background: var(--bg); }
    .btn-primary { background: var(--green); color: #fff; border-color: var(--green); }
    .btn-primary:hover { background: var(--green-dark); }
    .btn-danger { background: #E24B4A; color: #fff; border-color: #E24B4A; padding: 5px 10px; font-size: 12px; }
    .btn-danger:hover { background: #A32D2D; }
    .btn-sm { padding: 5px 12px; font-size: 12px; }
    .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 1.25rem; }

    .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }
    .badge-teal { background: #E1F5EE; color: #0F6E56; }
    .badge-blue { background: #E6F1FB; color: #185FA5; }
    .badge-amber { background: #FAEEDA; color: #854F0B; }
    .badge-gray { background: #F1EFE8; color: #5F5E5A; }
    .badge-pink { background: #FBEAF0; color: #993556; }
    .badge-coral { background: #FAECE7; color: #993C1D; }

    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { font-size: 11px; font-weight: 600; color: var(--text-muted); text-align: left; padding: 8px 12px; border-bottom: 0.5px solid var(--border); white-space: nowrap; text-transform: uppercase; letter-spacing: .04em; }
    td { padding: 10px 12px; border-bottom: 0.5px solid var(--border); vertical-align: middle; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: var(--bg); }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 1.25rem; }
    .stat-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 1rem; }
    .stat-card .lbl { font-size: 11px; color: var(--text-muted); font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .04em; }
    .stat-card .val { font-size: 22px; font-weight: 600; color: var(--text); }
    .stat-card .val.green { color: var(--green-dark); font-size: 17px; }

    .bday-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 0.5px solid var(--border); }
    .bday-item:last-child { border-bottom: none; }
    .bday-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex-shrink: 0; }
    .bday-name { font-size: 14px; font-weight: 500; }
    .bday-date { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
    .bday-right { margin-left: auto; text-align: right; }

    .alert-bday { background: #FAEEDA; border: 0.5px solid #FAC775; border-radius: var(--radius); padding: 12px 16px; margin-bottom: 1rem; display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #854F0B; line-height: 1.5; }
    .filter-bar { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
    .filter-btn { padding: 5px 14px; font-size: 12px; border-radius: 999px; border: 0.5px solid var(--border-md); background: var(--surface); cursor: pointer; color: var(--text-muted); transition: all .15s; font-weight: 500; }
    .filter-btn.active { background: var(--green-light); color: var(--green-dark); border-color: #5DCAA5; }
    .filter-btn:hover:not(.active) { background: var(--bg); color: var(--text); }

    .search-bar { display: flex; gap: 8px; margin-bottom: 1rem; }
    .search-bar input { flex: 1; font-size: 13px; padding: 8px 12px; border: 0.5px solid var(--border-md); border-radius: var(--radius); background: var(--surface); color: var(--text); }
    .search-bar input:focus { outline: none; border-color: var(--green); }

    .empty { text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-size: 13px; }
    .empty i { font-size: 36px; display: block; margin-bottom: .75rem; opacity: .5; }

    .msg { padding: 10px 14px; border-radius: var(--radius); margin-bottom: 1rem; font-size: 13px; display: none; }
    .msg-success { background: #E1F5EE; color: #0F6E56; border: 0.5px solid #5DCAA5; }
    .msg-error { background: #FCEBEB; color: #A32D2D; border: 0.5px solid #F7C1C1; }

    hr.divider { border: none; border-top: 0.5px solid var(--border); margin: 1.25rem 0; }

    @media (max-width: 640px) {
      .form-grid, .form-grid-3 { grid-template-columns: 1fr; }
      .full-width { grid-column: 1; }
      .content { padding: 1rem; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>

<div class="header">
  <div class="header-logo"><i class="ti ti-building-hospital"></i></div>
  <div>
    <h1>Sistema Financeiro & RH</h1>
    <p id="hoje"></p>
  </div>
</div>

<div class="nav">
  <button class="nav-btn active" onclick="goTab('cadastro')"><i class="ti ti-user-plus"></i> Cadastro</button>
  <button class="nav-btn" onclick="goTab('profissionais')"><i class="ti ti-users"></i> Profissionais</button>
  <button class="nav-btn" onclick="goTab('aniversariantes')"><i class="ti ti-cake"></i> Aniversariantes</button>
  <button class="nav-btn" onclick="goTab('relatorios')"><i class="ti ti-chart-bar"></i> Relatórios</button>
</div>

<div class="content">

  <!-- CADASTRO -->
  <div class="tab active" id="tab-cadastro">
    <div class="card">
      <div class="card-title"><i class="ti ti-user-plus" style="color:var(--green)"></i> Cadastro de Profissional</div>
      <div class="msg" id="form-msg"></div>

      <div class="section-label">Dados Pessoais</div>
      <div class="form-grid">
        <div class="form-group full-width"><label>Nome Completo *</label><input id="f-nome" type="text" placeholder="Nome completo"></div>
        <div class="form-group"><label>CPF *</label><input id="f-cpf" type="text" placeholder="000.000.000-00" maxlength="14"></div>
        <div class="form-group"><label>RG</label><input id="f-rg" type="text" placeholder="00.000.000-0"></div>
        <div class="form-group"><label>Data de Nascimento *</label><input id="f-nasc" type="date"></div>
        <div class="form-group"><label>Telefone *</label><input id="f-tel" type="text" placeholder="(00) 00000-0000" maxlength="15"></div>
        <div class="form-group"><label>E-mail</label><input id="f-email" type="email" placeholder="email@exemplo.com"></div>
        <div class="form-group full-width"><label>Endereço Completo</label><input id="f-end" type="text" placeholder="Rua, número, bairro, cidade — UF"></div>
        <div class="form-group"><label>Chave PIX</label><input id="f-pix" type="text" placeholder="CPF, e-mail, telefone ou chave aleatória"></div>
      </div>

      <hr class="divider">
      <div class="section-label">Dados Profissionais</div>
      <div class="form-grid">
        <div class="form-group"><label>Especialidade *</label>
          <select id="f-esp">
            <option value="">Selecione...</option>
            <option>Psicologia</option>
            <option>Fonoaudiologia</option>
            <option>Psicopedagogia</option>
            <option>Psicomotricidade</option>
            <option>Terapeuta Ocupacional</option>
            <option>Assistente Terapêutico</option>
            <option>Estagiário</option>
            <option>Serviços Gerais</option>
            <option>Recepcionista</option>
            <option>Assistente Administrativo</option>
            <option>Auxiliar Financeiro</option>
          </select>
        </div>
        <div class="form-group"><label>Tipo de Conselho</label>
          <select id="f-conselho">
            <option value="">Nenhum</option>
            <option>CRP</option>
            <option>CREFITO</option>
            <option>CREFONO</option>
            <option>CREF</option>
          </select>
        </div>
        <div class="form-group"><label>Número do Conselho</label><input id="f-ncons" type="text" placeholder="Ex: 09/99999"></div>
        <div class="form-group"><label>Horário de Trabalho</label><input id="f-horario" type="text" placeholder="Ex: Seg–Sex 08h–17h"></div>
        <div class="form-group"><label>Carga Horária Semanal (h)</label><input id="f-csem" type="number" placeholder="40" min="0"></div>
        <div class="form-group"><label>Carga Horária Mensal (h)</label><input id="f-cmen" type="number" placeholder="160" min="0"></div>
        <div class="form-group"><label>Valor da Hora (R$)</label><input id="f-hora" type="number" step="0.01" placeholder="0,00" min="0"></div>
        <div class="form-group"><label>Valor a Receber (R$)</label><input id="f-vrec" type="number" step="0.01" placeholder="0,00" min="0"></div>
      </div>

      <div class="form-group" style="margin-top:1rem">
        <label>Plano de Saúde</label>
        <div class="radio-group">
          <label><input type="radio" name="plano" value="Sim"> Opta pelo plano de saúde</label>
          <label><input type="radio" name="plano" value="Não" checked> Não opta pelo plano de saúde</label>
        </div>
      </div>

      <div class="actions">
        <button class="btn" onclick="limparForm()"><i class="ti ti-x"></i> Limpar</button>
        <button class="btn btn-primary" onclick="salvarProf()"><i class="ti ti-check"></i> Salvar Profissional</button>
      </div>
    </div>
  </div>

  <!-- PROFISSIONAIS -->
  <div class="tab" id="tab-profissionais">
    <div class="card">
      <div class="card-title"><i class="ti ti-users" style="color:var(--green)"></i> Profissionais Cadastrados</div>
      <div class="search-bar">
        <input type="text" id="busca" placeholder="Buscar por nome, CPF ou especialidade..." oninput="renderTable()">
      </div>
      <div class="filter-bar" id="filter-esp"></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th><th>Especialidade</th><th>Conselho</th><th>Telefone</th>
              <th>C. Mensal</th><th>Valor/Hora</th><th>A Receber</th><th>Plano</th><th></th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
        <div id="empty-table" class="empty" style="display:none">
          <i class="ti ti-users-off"></i>Nenhum profissional encontrado
        </div>
      </div>
    </div>
  </div>

  <!-- ANIVERSARIANTES -->
  <div class="tab" id="tab-aniversariantes">
    <div id="bday-alert"></div>
    <div class="card">
      <div class="card-title"><i class="ti ti-cake" style="color:var(--green)"></i> Aniversariantes do Mês</div>
      <div id="bday-mes"></div>
    </div>
    <div class="card">
      <div class="card-title"><i class="ti ti-calendar-event" style="color:#185FA5"></i> Todos os Aniversários (por mês)</div>
      <div id="bday-todos"></div>
    </div>
  </div>

  <!-- RELATÓRIOS -->
  <div class="tab" id="tab-relatorios">
    <div class="stats-grid" id="stats-gerais"></div>
    <div class="filter-bar" id="rel-filters"></div>
    <div class="card" id="rel-card">
      <div class="card-title" id="rel-titulo"></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Especialidade</th><th>Qtd</th><th>Carga Total (h/mês)</th><th>Total a Pagar</th><th>Com Plano</th></tr></thead>
          <tbody id="rel-tbody"></tbody>
        </table>
        <div id="rel-empty" class="empty" style="display:none"><i class="ti ti-chart-off"></i>Sem dados para exibir. Cadastre profissionais primeiro.</div>
      </div>
    </div>
    <div class="card" id="rel-detalhe" style="display:none">
      <div class="card-title" id="rel-det-titulo"></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nome</th><th>Conselho</th><th>Horário</th><th>C. Semanal</th><th>C. Mensal</th><th>Valor/h</th><th>A Receber</th><th>Plano</th></tr></thead>
          <tbody id="rel-det-tbody"></tbody>
        </table>
      </div>
    </div>
  </div>

</div><!-- /content -->

<script>
const ESPS = ['Psicologia','Fonoaudiologia','Psicopedagogia','Psicomotricidade','Terapeuta Ocupacional','Assistente Terapêutico','Estagiário','Serviços Gerais','Recepcionista','Assistente Administrativo','Auxiliar Financeiro'];
const BADGE_CLASSES = ['badge-teal','badge-blue','badge-amber','badge-pink','badge-gray','badge-coral','badge-amber','badge-gray','badge-blue','badge-pink','badge-teal'];
const AVATAR_BG = ['#E1F5EE','#E6F1FB','#FAEEDA','#FBEAF0','#F1EFE8','#FAECE7'];
const AVATAR_TX = ['#0F6E56','#185FA5','#854F0B','#993556','#5F5E5A','#993C1D'];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

let profissionais = JSON.parse(localStorage.getItem('rh_profs') || '[]');
let filtroEsp = '';
let relFiltro = '';

function salvarLS() { localStorage.setItem('rh_profs', JSON.stringify(profissionais)); }
function fmt(v) { return parseFloat(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

// Data de hoje
document.getElementById('hoje').textContent = new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

// Navegação
function goTab(t) {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(x => x.classList.remove('active'));
  document.getElementById('tab-'+t).classList.add('active');
  const idx = ['cadastro','profissionais','aniversariantes','relatorios'].indexOf(t);
  document.querySelectorAll('.nav-btn')[idx].classList.add('active');
  if(t==='profissionais'){buildFilters();renderTable();}
  if(t==='aniversariantes') renderBday();
  if(t==='relatorios'){buildRelFilters();renderRel();}
}

// Máscaras
document.getElementById('f-cpf').addEventListener('input', function() {
  let v = this.value.replace(/\\D/g,'');
  if(v.length>3) v = v.slice(0,3)+'.'+v.slice(3);
  if(v.length>7) v = v.slice(0,7)+'.'+v.slice(7);
  if(v.length>11) v = v.slice(0,11)+'-'+v.slice(11);
  this.value = v.slice(0,14);
});
document.getElementById('f-tel').addEventListener('input', function() {
  let v = this.value.replace(/\\D/g,'');
  if(v.length>0) v = '('+v;
  if(v.length>3) v = v.slice(0,3)+') '+v.slice(3);
  if(v.length>10) v = v.slice(0,10)+'-'+v.slice(10);
  this.value = v.slice(0,15);
});

// Salvar profissional
function salvarProf() {
  const v = id => document.getElementById(id).value.trim();
  const nome=v('f-nome'), cpf=v('f-cpf'), esp=v('f-esp'), nasc=v('f-nasc'), tel=v('f-tel');
  const msg = document.getElementById('form-msg');
  if(!nome||!cpf||!esp||!nasc||!tel) {
    msg.className='msg msg-error'; msg.style.display='block';
    msg.textContent='Preencha os campos obrigatórios: Nome, CPF, Especialidade, Nascimento e Telefone.';
    return;
  }
  const plano = document.querySelector('input[name="plano"]:checked')?.value || 'Não';
  const prof = {
    id:Date.now(), nome, cpf, rg:v('f-rg'), nasc, tel,
    email:v('f-email'), end:v('f-end'), pix:v('f-pix'),
    esp, conselho:v('f-conselho'), ncons:v('f-ncons'),
    horario:v('f-horario'), csem:v('f-csem'), cmen:v('f-cmen'),
    hora:v('f-hora'), vrec:v('f-vrec'), plano
  };
  profissionais.push(prof);
  salvarLS();
  msg.className='msg msg-success'; msg.style.display='block';
  msg.textContent='✓ Profissional cadastrado com sucesso!';
  limparForm(true);
  setTimeout(()=>msg.style.display='none', 3500);
}

function limparForm(keep) {
  ['f-nome','f-cpf','f-rg','f-nasc','f-tel','f-email','f-end','f-pix','f-ncons','f-horario','f-csem','f-cmen','f-hora','f-vrec']
    .forEach(id => document.getElementById(id).value='');
  document.getElementById('f-esp').value='';
  document.getElementById('f-conselho').value='';
  document.querySelector('input[name="plano"][value="Não"]').checked=true;
  if(!keep) document.getElementById('form-msg').style.display='none';
}

// Filtros
function buildFilters() {
  const fb = document.getElementById('filter-esp');
  fb.innerHTML = \`<button class="filter-btn\${filtroEsp===''?' active':''}" onclick="setFiltro('')">Todos (\${profissionais.length})</button>\`;
  ESPS.forEach(e => {
    const c = profissionais.filter(p=>p.esp===e).length;
    if(c>0) fb.innerHTML += \`<button class="filter-btn\${filtroEsp===e?' active':''}" onclick="setFiltro('\${e}')">\${e} (\${c})</button>\`;
  });
}
function setFiltro(e){filtroEsp=e;buildFilters();renderTable();}

// Tabela de profissionais
function renderTable() {
  const q = (document.getElementById('busca').value||'').toLowerCase();
  const data = profissionais.filter(p =>
    (filtroEsp===''||p.esp===filtroEsp) &&
    (!q || (p.nome+p.cpf+p.esp).toLowerCase().includes(q))
  );
  const tb = document.getElementById('tbody');
  const empty = document.getElementById('empty-table');
  empty.style.display = data.length ? 'none' : 'block';
  tb.innerHTML = data.map(p => {
    const i = ESPS.indexOf(p.esp) % BADGE_CLASSES.length;
    return \`<tr>
      <td><strong style="font-weight:500">\${p.nome}</strong><br><span style="font-size:11px;color:var(--text-muted)">\${p.cpf}</span></td>
      <td><span class="badge \${BADGE_CLASSES[i]}">\${p.esp}</span></td>
      <td style="font-size:12px;color:var(--text-muted)">\${p.conselho?p.conselho+' '+p.ncons:'-'}</td>
      <td style="font-size:12px">\${p.tel}</td>
      <td style="font-size:12px">\${p.cmen||0}h</td>
      <td style="font-size:12px">\${fmt(p.hora)}</td>
      <td style="font-weight:600;color:var(--green-dark)">\${fmt(p.vrec)}</td>
      <td><span class="badge \${p.plano==='Sim'?'badge-teal':'badge-gray'}">\${p.plano}</span></td>
      <td><button class="btn btn-danger" onclick="excluir(\${p.id})" title="Excluir"><i class="ti ti-trash"></i></button></td>
    </tr>\`;
  }).join('');
}

function excluir(id) {
  if(confirm('Confirmar exclusão do profissional?')) {
    profissionais = profissionais.filter(p=>p.id!==id);
    salvarLS(); buildFilters(); renderTable();
  }
}

// Aniversariantes
function renderBday() {
  const hoje = new Date();
  const mm = hoje.getMonth();

  const proxSemana = profissionais.filter(p => {
    if(!p.nasc) return false;
    const [,m,d] = p.nasc.split('-').map(Number);
    let bday = new Date(hoje.getFullYear(), m-1, d);
    if(bday < hoje) bday.setFullYear(hoje.getFullYear()+1);
    const diff = (bday - hoje) / 86400000;
    return diff >= 0 && diff <= 7;
  });

  const alertDiv = document.getElementById('bday-alert');
  if(proxSemana.length) {
    alertDiv.innerHTML = \`<div class="alert-bday">
      <i class="ti ti-bell" style="font-size:20px;flex-shrink:0;margin-top:1px"></i>
      <div><strong>Lembrete de aniversário!</strong><br>
      \${proxSemana.map(p=>\`<strong>\${p.nome}</strong>\`).join(', ')} faz\${proxSemana.length>1?'em':''} aniversário nos próximos 7 dias.</div>
    </div>\`;
  } else {
    alertDiv.innerHTML = '';
  }

  function avatarItem(p) {
    const [,m,d] = p.nasc.split('-').map(Number);
    const ini = p.nome.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
    const ci = profissionais.indexOf(p) % AVATAR_BG.length;
    const bday = new Date(hoje.getFullYear(), m-1, d);
    if(bday < hoje) bday.setFullYear(hoje.getFullYear()+1);
    const diff = Math.round((bday-hoje)/86400000);
    let label;
    if(diff===0) label = \`<span class="badge badge-teal">Hoje! 🎂</span>\`;
    else if(diff<=7) label = \`<span class="badge badge-amber">Em \${diff} dias</span>\`;
    else label = \`<span style="font-size:12px;color:var(--text-muted)">Dia \${String(d).padStart(2,'0')}/\${String(m).padStart(2,'0')}</span>\`;
    return \`<div class="bday-item">
      <div class="bday-avatar" style="background:\${AVATAR_BG[ci]};color:\${AVATAR_TX[ci]}">\${ini}</div>
      <div>
        <div class="bday-name">\${p.nome}</div>
        <div class="bday-date">\${p.esp||''} · \${p.nasc.split('-').reverse().join('/')}</div>
      </div>
      <div class="bday-right">\${label}</div>
    </div>\`;
  }

  const doMes = profissionais.filter(p => p.nasc && parseInt(p.nasc.split('-')[1])===mm+1)
    .sort((a,b) => parseInt(a.nasc.split('-')[2]) - parseInt(b.nasc.split('-')[2]));
  document.getElementById('bday-mes').innerHTML = doMes.length
    ? doMes.map(p=>avatarItem(p)).join('')
    : \`<div class="empty"><i class="ti ti-cake-off"></i>Nenhum aniversariante em \${MESES[mm]}</div>\`;

  // Todos agrupados por mês
  const todos = profissionais.filter(p=>p.nasc);
  let htmlTodos = '';
  MESES.forEach((mes, mi) => {
    const grupo = todos.filter(p=>parseInt(p.nasc.split('-')[1])===mi+1)
      .sort((a,b)=>parseInt(a.nasc.split('-')[2])-parseInt(b.nasc.split('-')[2]));
    if(grupo.length) {
      htmlTodos += \`<div style="margin-bottom:1.25rem">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem;padding-bottom:.5rem;border-bottom:0.5px solid var(--border)">\${mes}</div>
        \${grupo.map(p=>avatarItem(p)).join('')}
      </div>\`;
    }
  });
  document.getElementById('bday-todos').innerHTML = htmlTodos ||
    \`<div class="empty"><i class="ti ti-users-off"></i>Nenhum profissional com data de nascimento cadastrada</div>\`;
}

// Relatórios
function buildRelFilters() {
  const fb = document.getElementById('rel-filters');
  fb.innerHTML = \`<button class="filter-btn\${relFiltro===''?' active':''}" onclick="setRelFiltro('')">Geral</button>\`;
  ESPS.forEach(e => {
    const c = profissionais.filter(p=>p.esp===e).length;
    if(c>0) fb.innerHTML += \`<button class="filter-btn\${relFiltro===e?' active':''}" onclick="setRelFiltro('\${e}')">\${e}</button>\`;
  });
}
function setRelFiltro(e){relFiltro=e;buildRelFilters();renderRel();}

function renderRel() {
  const total = profissionais.length;
  const totalPagar = profissionais.reduce((s,p)=>s+parseFloat(p.vrec||0),0);
  const comPlano = profissionais.filter(p=>p.plano==='Sim').length;
  const totalH = profissionais.reduce((s,p)=>s+parseFloat(p.cmen||0),0);
  const esps = [...new Set(profissionais.map(p=>p.esp))].length;

  document.getElementById('stats-gerais').innerHTML = \`
    <div class="stat-card"><div class="lbl">Profissionais</div><div class="val">\${total}</div></div>
    <div class="stat-card"><div class="lbl">Total a Pagar</div><div class="val green">\${fmt(totalPagar)}</div></div>
    <div class="stat-card"><div class="lbl">Horas/mês total</div><div class="val">\${totalH}h</div></div>
    <div class="stat-card"><div class="lbl">Com Plano</div><div class="val">\${comPlano}</div></div>
    <div class="stat-card"><div class="lbl">Especialidades</div><div class="val">\${esps}</div></div>
  \`;

  if(relFiltro==='') {
    document.getElementById('rel-card').style.display='block';
    document.getElementById('rel-detalhe').style.display='none';
    document.getElementById('rel-titulo').innerHTML=\`<i class="ti ti-chart-bar" style="color:var(--green)"></i> Relatório por Especialidade\`;
    const rows = ESPS.map(e => {
      const g = profissionais.filter(p=>p.esp===e);
      if(!g.length) return '';
      const carga = g.reduce((s,p)=>s+parseFloat(p.cmen||0),0);
      const pagar = g.reduce((s,p)=>s+parseFloat(p.vrec||0),0);
      const planos = g.filter(p=>p.plano==='Sim').length;
      const i = ESPS.indexOf(e) % BADGE_CLASSES.length;
      return \`<tr>
        <td><span class="badge \${BADGE_CLASSES[i]}">\${e}</span></td>
        <td><strong>\${g.length}</strong></td>
        <td>\${carga}h</td>
        <td style="font-weight:600;color:var(--green-dark)">\${fmt(pagar)}</td>
        <td>\${planos}</td>
      </tr>\`;
    }).join('');
    document.getElementById('rel-tbody').innerHTML = rows || '';
    document.getElementById('rel-empty').style.display = profissionais.length ? 'none' : 'block';
  } else {
    document.getElementById('rel-card').style.display='none';
    document.getElementById('rel-detalhe').style.display='block';
    const i = ESPS.indexOf(relFiltro) % BADGE_CLASSES.length;
    document.getElementById('rel-det-titulo').innerHTML = \`<i class="ti ti-list" style="color:var(--green)"></i> Profissionais — <span class="badge \${BADGE_CLASSES[i]}">\${relFiltro}</span>\`;
    const g = profissionais.filter(p=>p.esp===relFiltro);
    document.getElementById('rel-det-tbody').innerHTML = g.map(p=>\`<tr>
      <td><strong style="font-weight:500">\${p.nome}</strong><br><span style="font-size:11px;color:var(--text-muted)">\${p.cpf}</span></td>
      <td style="font-size:12px">\${p.conselho?p.conselho+' '+p.ncons:'-'}</td>
      <td style="font-size:12px">\${p.horario||'-'}</td>
      <td style="font-size:12px">\${p.csem||0}h</td>
      <td style="font-size:12px">\${p.cmen||0}h</td>
      <td style="font-size:12px">\${fmt(p.hora)}</td>
      <td style="font-weight:600;color:var(--green-dark)">\${fmt(p.vrec)}</td>
      <td><span class="badge \${p.plano==='Sim'?'badge-teal':'badge-gray'}">\${p.plano}</span></td>
    </tr>\`).join('');
  }
}
</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(HTML);
});

server.listen(PORT, () => {
  console.log('Sistema rodando na porta ' + PORT);
});
