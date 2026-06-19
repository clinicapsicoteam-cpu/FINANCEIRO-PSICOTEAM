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
      --bg: #f5f5f3; --surface: #ffffff; --border: rgba(0,0,0,0.10); --border-md: rgba(0,0,0,0.18);
      --text: #1a1a18; --text-muted: #6b6b67; --green: #1D9E75; --green-dark: #0F6E56; --green-light: #E1F5EE;
      --radius: 8px; --radius-lg: 12px;
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
    .tab { display: none; } .tab.active { display: block; }
    .card { background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1rem; }
    .card-title { font-size: 15px; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
    .section-label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: .05em; margin: 1.25rem 0 .75rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 4px; }
    .form-group label { font-size: 12px; color: var(--text-muted); font-weight: 500; }
    .form-group input, .form-group select { font-size: 13px; padding: 8px 10px; border: 0.5px solid var(--border-md); border-radius: var(--radius); background: var(--surface); color: var(--text); width: 100%; transition: border-color .15s, box-shadow .15s; }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: var(--green); box-shadow: 0 0 0 3px rgba(29,158,117,.12); }
    .full-width { grid-column: 1 / -1; }
    .radio-group { display: flex; gap: 1.5rem; padding: 8px 0; }
    .radio-group label { font-size: 13px; display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .btn { padding: 9px 18px; border-radius: var(--radius); font-size: 13px; font-weight: 500; cursor: pointer; border: 0.5px solid var(--border-md); background: var(--surface); color: var(--text); transition: all .15s; display: inline-flex; align-items: center; gap: 6px; }
    .btn:hover { background: var(--bg); }
    .btn-primary { background: var(--green); color: #fff; border-color: var(--green); }
    .btn-primary:hover { background: var(--green-dark); }
    .btn-danger { background: #E24B4A; color: #fff; border-color: #E24B4A; }
    .btn-danger:hover { background: #A32D2D; }
    .btn-edit { background: #E6F1FB; color: #185FA5; border-color: #185FA5; }
    .btn-edit:hover { background: #cce0f5; }
    .btn-sm { padding: 5px 10px; font-size: 12px; }
    .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 1.25rem; }
    .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }
    .badge-teal { background: #E1F5EE; color: #0F6E56; } .badge-blue { background: #E6F1FB; color: #185FA5; }
    .badge-amber { background: #FAEEDA; color: #854F0B; } .badge-gray { background: #F1EFE8; color: #5F5E5A; }
    .badge-pink { background: #FBEAF0; color: #993556; } .badge-coral { background: #FAECE7; color: #993C1D; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { font-size: 11px; font-weight: 600; color: var(--text-muted); text-align: left; padding: 8px 12px; border-bottom: 0.5px solid var(--border); white-space: nowrap; text-transform: uppercase; letter-spacing: .04em; }
    td { padding: 10px 12px; border-bottom: 0.5px solid var(--border); vertical-align: middle; }
    tr:last-child td { border-bottom: none; } tr:hover td { background: var(--bg); }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 1.25rem; }
    .stat-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 1rem; }
    .stat-card .lbl { font-size: 11px; color: var(--text-muted); font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .04em; }
    .stat-card .val { font-size: 22px; font-weight: 600; } .stat-card .val.green { color: var(--green-dark); font-size: 17px; }
    .bday-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 0.5px solid var(--border); }
    .bday-item:last-child { border-bottom: none; }
    .bday-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex-shrink: 0; }
    .bday-name { font-size: 14px; font-weight: 500; } .bday-date { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
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

    /* MODAL */
    .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1000; align-items: center; justify-content: center; padding: 1rem; }
    .modal-overlay.open { display: flex; }
    .modal { background: var(--surface); border-radius: var(--radius-lg); width: 100%; max-width: 780px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
    .modal-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid var(--border); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: var(--surface); z-index: 1; }
    .modal-header h2 { font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
    .modal-body { padding: 1.5rem; }
    .modal-footer { padding: 1rem 1.5rem; border-top: 0.5px solid var(--border); display: flex; gap: 8px; justify-content: flex-end; background: var(--surface); position: sticky; bottom: 0; }
    .btn-close { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 20px; padding: 4px; border-radius: var(--radius); }
    .btn-close:hover { background: var(--bg); color: var(--text); }

    @media (max-width: 640px) {
      .form-grid { grid-template-columns: 1fr; } .full-width { grid-column: 1; }
      .content { padding: 1rem; } .stats-grid { grid-template-columns: 1fr 1fr; }
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
            <option>Psicologia</option><option>Fonoaudiologia</option><option>Psicopedagogia</option>
            <option>Psicomotricidade</option><option>Terapeuta Ocupacional</option>
            <option>Assistente Terapêutico</option><option>Estagiário</option>
            <option>Serviços Gerais</option><option>Recepcionista</option>
            <option>Assistente Administrativo</option><option>Auxiliar Financeiro</option>
          </select>
        </div>
        <div class="form-group"><label>Cargo</label><input id="f-cargo" type="text" placeholder="Ex: Psicólogo Clínico, Coordenador..."></div>
        <div class="form-group"><label>Tipo de Conselho</label>
          <select id="f-conselho">
            <option value="">Nenhum</option>
            <option>CRP</option><option>CREFITO</option><option>CREFONO</option><option>CREF</option><option>ABPp</option>
          </select>
        </div>
        <div class="form-group"><label>Número do Conselho</label><input id="f-ncons" type="text" placeholder="Ex: 09/99999"></div>
        <div class="form-group"><label>Horário de Trabalho</label><input id="f-horario" type="text" placeholder="Ex: Seg–Sex 08h–17h"></div>
        <div class="form-group"><label>Carga Horária Semanal (h)</label><input id="f-csem" type="number" placeholder="40" min="0"></div>
        <div class="form-group"><label>Carga Horária Mensal (h)</label><input id="f-cmen" type="number" placeholder="160" min="0"></div>
        <div class="form-group"><label>Valor da Hora (R$)</label><input id="f-hora" type="text" placeholder="R$ 0,00" oninput="maskCurrency(this)"></div>
        <div class="form-group"><label>Valor a Receber (R$)</label><input id="f-vrec" type="text" placeholder="R$ 0,00" oninput="maskCurrency(this)"></div>
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
            <tr><th>Nome</th><th>Especialidade</th><th>Cargo</th><th>Conselho</th><th>Telefone</th><th>C. Mensal</th><th>Valor/Hora</th><th>A Receber</th><th>Plano</th><th></th></tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
        <div id="empty-table" class="empty" style="display:none"><i class="ti ti-users-off"></i>Nenhum profissional encontrado</div>
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
        <div id="rel-empty" class="empty" style="display:none"><i class="ti ti-chart-off"></i>Sem dados. Cadastre profissionais primeiro.</div>
      </div>
    </div>
    <div class="card" id="rel-detalhe" style="display:none">
      <div class="card-title" id="rel-det-titulo"></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nome</th><th>Cargo</th><th>Conselho</th><th>Horário</th><th>C. Semanal</th><th>C. Mensal</th><th>Valor/h</th><th>A Receber</th><th>Plano</th></tr></thead>
          <tbody id="rel-det-tbody"></tbody>
        </table>
      </div>
    </div>
  </div>

</div>

<!-- MODAL EDITAR -->
<div class="modal-overlay" id="modal-editar">
  <div class="modal">
    <div class="modal-header">
      <h2><i class="ti ti-pencil" style="color:var(--green)"></i> Editar Profissional</h2>
      <button class="btn-close" onclick="fecharModal()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="section-label">Dados Pessoais</div>
      <div class="form-grid">
        <div class="form-group full-width"><label>Nome Completo *</label><input id="e-nome" type="text"></div>
        <div class="form-group"><label>CPF *</label><input id="e-cpf" type="text" maxlength="14"></div>
        <div class="form-group"><label>RG</label><input id="e-rg" type="text"></div>
        <div class="form-group"><label>Data de Nascimento</label><input id="e-nasc" type="date"></div>
        <div class="form-group"><label>Telefone</label><input id="e-tel" type="text" maxlength="15"></div>
        <div class="form-group"><label>E-mail</label><input id="e-email" type="email"></div>
        <div class="form-group full-width"><label>Endereço</label><input id="e-end" type="text"></div>
        <div class="form-group"><label>Chave PIX</label><input id="e-pix" type="text"></div>
      </div>
      <hr class="divider">
      <div class="section-label">Dados Profissionais</div>
      <div class="form-grid">
        <div class="form-group"><label>Especialidade *</label>
          <select id="e-esp">
            <option value="">Selecione...</option>
            <option>Psicologia</option><option>Fonoaudiologia</option><option>Psicopedagogia</option>
            <option>Psicomotricidade</option><option>Terapeuta Ocupacional</option>
            <option>Assistente Terapêutico</option><option>Estagiário</option>
            <option>Serviços Gerais</option><option>Recepcionista</option>
            <option>Assistente Administrativo</option><option>Auxiliar Financeiro</option>
          </select>
        </div>
        <div class="form-group"><label>Cargo</label><input id="e-cargo" type="text"></div>
        <div class="form-group"><label>Tipo de Conselho</label>
          <select id="e-conselho">
            <option value="">Nenhum</option>
            <option>CRP</option><option>CREFITO</option><option>CREFONO</option><option>CREF</option><option>ABPp</option>
          </select>
        </div>
        <div class="form-group"><label>Número do Conselho</label><input id="e-ncons" type="text"></div>
        <div class="form-group"><label>Horário de Trabalho</label><input id="e-horario" type="text"></div>
        <div class="form-group"><label>Carga Horária Semanal (h)</label><input id="e-csem" type="number" min="0"></div>
        <div class="form-group"><label>Carga Horária Mensal (h)</label><input id="e-cmen" type="number" min="0"></div>
        <div class="form-group"><label>Valor da Hora (R$)</label><input id="e-hora" type="text" placeholder="R$ 0,00" oninput="maskCurrency(this)"></div>
        <div class="form-group"><label>Valor a Receber (R$)</label><input id="e-vrec" type="text" placeholder="R$ 0,00" oninput="maskCurrency(this)"></div>
      </div>
      <div class="form-group" style="margin-top:1rem">
        <label>Plano de Saúde</label>
        <div class="radio-group">
          <label><input type="radio" name="e-plano" value="Sim"> Opta pelo plano de saúde</label>
          <label><input type="radio" name="e-plano" value="Não" checked> Não opta pelo plano de saúde</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="fecharModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarEdicao()"><i class="ti ti-check"></i> Salvar Alterações</button>
    </div>
  </div>
</div>

<script>
const ESPS = ['Psicologia','Fonoaudiologia','Psicopedagogia','Psicomotricidade','Terapeuta Ocupacional','Assistente Terapêutico','Estagiário','Serviços Gerais','Recepcionista','Assistente Administrativo','Auxiliar Financeiro'];
const BADGES = ['badge-teal','badge-blue','badge-amber','badge-pink','badge-gray','badge-coral','badge-amber','badge-gray','badge-blue','badge-pink','badge-teal'];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const AVATAR_BG = ['#E1F5EE','#E6F1FB','#FAEEDA','#FBEAF0','#F1EFE8','#FAECE7'];
const AVATAR_TX = ['#0F6E56','#185FA5','#854F0B','#993556','#5F5E5A','#993C1D'];

let profissionais = JSON.parse(localStorage.getItem('rh_profs') || '[]');
let filtroEsp = '', relFiltro = '', editandoId = null;

function salvarLS() { localStorage.setItem('rh_profs', JSON.stringify(profissionais)); }

// Máscara de moeda BR
function maskCurrency(el) {
  let v = el.value.replace(/\\D/g, '');
  if (!v) { el.value = ''; return; }
  v = (parseInt(v) / 100).toFixed(2);
  el.value = 'R$ ' + v.replace('.', ',').replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.');
}

// Converte valor mascarado para float
function parseCurrency(v) {
  if (!v) return 0;
  return parseFloat(v.replace('R$', '').replace(/\\./g, '').replace(',', '.').trim()) || 0;
}

function fmt(v) { return parseCurrency(String(v)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function fmtStored(v) {
  // v pode ser número ou string "R$ 5.000,00"
  const n = typeof v === 'string' && v.includes('R$') ? parseCurrency(v) : parseFloat(v || 0);
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.getElementById('hoje').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// Máscaras CPF e Tel no cadastro
function applyMaskCPF(el) {
  let v = el.value.replace(/\\D/g, '');
  if (v.length > 3) v = v.slice(0,3) + '.' + v.slice(3);
  if (v.length > 7) v = v.slice(0,7) + '.' + v.slice(7);
  if (v.length > 11) v = v.slice(0,11) + '-' + v.slice(11);
  el.value = v.slice(0,14);
}
function applyMaskTel(el) {
  let v = el.value.replace(/\\D/g, '');
  if (v.length > 0) v = '(' + v;
  if (v.length > 3) v = v.slice(0,3) + ') ' + v.slice(3);
  if (v.length > 10) v = v.slice(0,10) + '-' + v.slice(10);
  el.value = v.slice(0,15);
}
document.getElementById('f-cpf').addEventListener('input', function(){ applyMaskCPF(this); });
document.getElementById('f-tel').addEventListener('input', function(){ applyMaskTel(this); });
document.getElementById('e-cpf').addEventListener('input', function(){ applyMaskCPF(this); });
document.getElementById('e-tel').addEventListener('input', function(){ applyMaskTel(this); });

// Navegação
function goTab(t) {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(x => x.classList.remove('active'));
  document.getElementById('tab-' + t).classList.add('active');
  document.querySelectorAll('.nav-btn')[['cadastro','profissionais','aniversariantes','relatorios'].indexOf(t)].classList.add('active');
  if (t === 'profissionais') { buildFilters(); renderTable(); }
  if (t === 'aniversariantes') renderBday();
  if (t === 'relatorios') { buildRelFilters(); renderRel(); }
}

// Salvar novo profissional
function salvarProf() {
  const v = id => document.getElementById(id).value.trim();
  const nome = v('f-nome'), cpf = v('f-cpf'), esp = v('f-esp'), nasc = v('f-nasc'), tel = v('f-tel');
  const msg = document.getElementById('form-msg');
  if (!nome || !cpf || !esp || !nasc || !tel) {
    msg.className = 'msg msg-error'; msg.style.display = 'block';
    msg.textContent = 'Preencha os campos obrigatórios: Nome, CPF, Especialidade, Nascimento e Telefone.'; return;
  }
  const plano = document.querySelector('input[name="plano"]:checked')?.value || 'Não';
  profissionais.push({
    id: Date.now(), nome, cpf, rg: v('f-rg'), nasc, tel, email: v('f-email'),
    end: v('f-end'), pix: v('f-pix'), esp, cargo: v('f-cargo'),
    conselho: v('f-conselho'), ncons: v('f-ncons'), horario: v('f-horario'),
    csem: v('f-csem'), cmen: v('f-cmen'),
    hora: v('f-hora'), vrec: v('f-vrec'), plano
  });
  salvarLS();
  msg.className = 'msg msg-success'; msg.style.display = 'block';
  msg.textContent = '✓ Profissional cadastrado com sucesso!';
  limparForm(true);
  setTimeout(() => msg.style.display = 'none', 3500);
}

function limparForm(keep) {
  ['f-nome','f-cpf','f-rg','f-nasc','f-tel','f-email','f-end','f-pix','f-cargo','f-ncons','f-horario','f-csem','f-cmen','f-hora','f-vrec']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-esp').value = '';
  document.getElementById('f-conselho').value = '';
  document.querySelector('input[name="plano"][value="Não"]').checked = true;
  if (!keep) document.getElementById('form-msg').style.display = 'none';
}

// Modal Editar
function abrirEditar(id) {
  const p = profissionais.find(x => x.id === id);
  if (!p) return;
  editandoId = id;
  const s = (eid, val) => { document.getElementById(eid).value = val || ''; };
  s('e-nome', p.nome); s('e-cpf', p.cpf); s('e-rg', p.rg); s('e-nasc', p.nasc);
  s('e-tel', p.tel); s('e-email', p.email); s('e-end', p.end); s('e-pix', p.pix);
  s('e-esp', p.esp); s('e-cargo', p.cargo); s('e-conselho', p.conselho); s('e-ncons', p.ncons);
  s('e-horario', p.horario); s('e-csem', p.csem); s('e-cmen', p.cmen);
  s('e-hora', p.hora); s('e-vrec', p.vrec);
  const planoVal = p.plano || 'Não';
  document.querySelector(\`input[name="e-plano"][value="\${planoVal}"]\`).checked = true;
  document.getElementById('modal-editar').classList.add('open');
}

function fecharModal() {
  document.getElementById('modal-editar').classList.remove('open');
  editandoId = null;
}

function salvarEdicao() {
  const v = id => document.getElementById(id).value.trim();
  const nome = v('e-nome'), cpf = v('e-cpf'), esp = v('e-esp');
  if (!nome || !cpf || !esp) { alert('Preencha Nome, CPF e Especialidade.'); return; }
  const plano = document.querySelector('input[name="e-plano"]:checked')?.value || 'Não';
  const idx = profissionais.findIndex(x => x.id === editandoId);
  if (idx === -1) return;
  profissionais[idx] = {
    ...profissionais[idx], nome, cpf, rg: v('e-rg'), nasc: v('e-nasc'),
    tel: v('e-tel'), email: v('e-email'), end: v('e-end'), pix: v('e-pix'),
    esp, cargo: v('e-cargo'), conselho: v('e-conselho'), ncons: v('e-ncons'),
    horario: v('e-horario'), csem: v('e-csem'), cmen: v('e-cmen'),
    hora: v('e-hora'), vrec: v('e-vrec'), plano
  };
  salvarLS();
  fecharModal();
  buildFilters();
  renderTable();
  // Garante que a aba profissionais está visível e atualizada
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(x => x.classList.remove('active'));
  document.getElementById('tab-profissionais').classList.add('active');
  document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

// Fechar modal clicando fora
document.getElementById('modal-editar').addEventListener('click', function(e) {
  if (e.target === this) fecharModal();
});

// Filtros
function buildFilters() {
  const fb = document.getElementById('filter-esp');
  fb.innerHTML = \`<button class="filter-btn\${filtroEsp===''?' active':''}" onclick="setFiltro('')">Todos (\${profissionais.length})</button>\`;
  ESPS.forEach(e => {
    const c = profissionais.filter(p => p.esp === e).length;
    if (c > 0) fb.innerHTML += \`<button class="filter-btn\${filtroEsp===e?' active':''}" onclick="setFiltro('\${e}')">\${e} (\${c})</button>\`;
  });
}
function setFiltro(e) { filtroEsp = e; buildFilters(); renderTable(); }

// Tabela
function renderTable() {
  const q = (document.getElementById('busca').value || '').toLowerCase();
  const data = profissionais.filter(p =>
    (filtroEsp === '' || p.esp === filtroEsp) &&
    (!q || (p.nome + p.cpf + p.esp).toLowerCase().includes(q))
  );
  const empty = document.getElementById('empty-table');
  empty.style.display = data.length ? 'none' : 'block';
  document.getElementById('tbody').innerHTML = data.map(p => {
    const i = ESPS.indexOf(p.esp) % BADGES.length;
    return \`<tr>
      <td><strong style="font-weight:500">\${p.nome}</strong><br><span style="font-size:11px;color:var(--text-muted)">\${p.cpf}</span></td>
      <td><span class="badge \${BADGES[i]}">\${p.esp}</span></td>
      <td style="font-size:12px;color:var(--text-muted)">\${p.cargo||'-'}</td>
      <td style="font-size:12px;color:var(--text-muted)">\${p.conselho?p.conselho+' '+p.ncons:'-'}</td>
      <td style="font-size:12px">\${p.tel}</td>
      <td style="font-size:12px">\${p.cmen||0}h</td>
      <td style="font-size:12px">\${fmtStored(p.hora)}</td>
      <td style="font-weight:600;color:var(--green-dark)">\${fmtStored(p.vrec)}</td>
      <td><span class="badge \${p.plano==='Sim'?'badge-teal':'badge-gray'}">\${p.plano}</span></td>
      <td style="display:flex;gap:4px">
        <button class="btn btn-edit btn-sm" onclick="abrirEditar(\${p.id})" title="Editar"><i class="ti ti-pencil"></i></button>
        <button class="btn btn-danger btn-sm" onclick="excluir(\${p.id})" title="Excluir"><i class="ti ti-trash"></i></button>
      </td>
    </tr>\`;
  }).join('');
}

function excluir(id) {
  if (confirm('Confirmar exclusão do profissional?')) {
    profissionais = profissionais.filter(p => p.id !== id);
    salvarLS(); buildFilters(); renderTable();
  }
}

// Aniversariantes
function renderBday() {
  const hoje = new Date();
  const mm = hoje.getMonth();
  const proxSemana = profissionais.filter(p => {
    if (!p.nasc) return false;
    const [,m,d] = p.nasc.split('-').map(Number);
    let bday = new Date(hoje.getFullYear(), m-1, d);
    if (bday < hoje) bday.setFullYear(hoje.getFullYear()+1);
    return (bday - hoje) / 86400000 <= 7;
  });
  document.getElementById('bday-alert').innerHTML = proxSemana.length
    ? \`<div class="alert-bday"><i class="ti ti-bell" style="font-size:20px;flex-shrink:0"></i><div><strong>Lembrete!</strong> \${proxSemana.map(p=>\`<strong>\${p.nome}</strong>\`).join(', ')} faz\${proxSemana.length>1?'em':''} aniversário nos próximos 7 dias.</div></div>\` : '';

  function item(p) {
    const [,m,d] = p.nasc.split('-').map(Number);
    const ini = p.nome.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
    const ci = profissionais.indexOf(p) % AVATAR_BG.length;
    const bday = new Date(hoje.getFullYear(), m-1, d);
    if (bday < hoje) bday.setFullYear(hoje.getFullYear()+1);
    const diff = Math.round((bday - hoje) / 86400000);
    const label = diff===0 ? \`<span class="badge badge-teal">Hoje! 🎂</span>\`
      : diff<=7 ? \`<span class="badge badge-amber">Em \${diff} dias</span>\`
      : \`<span style="font-size:12px;color:var(--text-muted)">Dia \${String(d).padStart(2,'0')}/\${String(m).padStart(2,'0')}</span>\`;
    return \`<div class="bday-item">
      <div class="bday-avatar" style="background:\${AVATAR_BG[ci]};color:\${AVATAR_TX[ci]}">\${ini}</div>
      <div><div class="bday-name">\${p.nome}</div><div class="bday-date">\${p.esp||''} · \${p.nasc.split('-').reverse().join('/')}</div></div>
      <div style="margin-left:auto">\${label}</div>
    </div>\`;
  }

  const doMes = profissionais.filter(p => p.nasc && parseInt(p.nasc.split('-')[1])===mm+1)
    .sort((a,b) => parseInt(a.nasc.split('-')[2]) - parseInt(b.nasc.split('-')[2]));
  document.getElementById('bday-mes').innerHTML = doMes.length ? doMes.map(item).join('')
    : \`<div class="empty"><i class="ti ti-cake-off"></i>Nenhum aniversariante em \${MESES[mm]}</div>\`;

  let html = '';
  MESES.forEach((mes, mi) => {
    const g = profissionais.filter(p => p.nasc && parseInt(p.nasc.split('-')[1])===mi+1)
      .sort((a,b) => parseInt(a.nasc.split('-')[2]) - parseInt(b.nasc.split('-')[2]));
    if (g.length) html += \`<div style="margin-bottom:1.25rem">
      <div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem;padding-bottom:.5rem;border-bottom:0.5px solid var(--border)">\${mes}</div>
      \${g.map(item).join('')}</div>\`;
  });
  document.getElementById('bday-todos').innerHTML = html || \`<div class="empty"><i class="ti ti-users-off"></i>Nenhum cadastrado com data de nascimento</div>\`;
}

// Relatórios
function buildRelFilters() {
  const fb = document.getElementById('rel-filters');
  fb.innerHTML = \`<button class="filter-btn\${relFiltro===''?' active':''}" onclick="setRelFiltro('')">Geral</button>\`;
  ESPS.forEach(e => {
    if (profissionais.some(p=>p.esp===e))
      fb.innerHTML += \`<button class="filter-btn\${relFiltro===e?' active':''}" onclick="setRelFiltro('\${e}')">\${e}</button>\`;
  });
}
function setRelFiltro(e) { relFiltro = e; buildRelFilters(); renderRel(); }

function renderRel() {
  const total = profissionais.length;
  const totalPagar = profissionais.reduce((s,p) => s + parseCurrency(String(p.vrec)), 0);
  const comPlano = profissionais.filter(p=>p.plano==='Sim').length;
  const totalH = profissionais.reduce((s,p) => s + parseFloat(p.cmen||0), 0);
  const esps = [...new Set(profissionais.map(p=>p.esp))].length;
  document.getElementById('stats-gerais').innerHTML = \`
    <div class="stat-card"><div class="lbl">Profissionais</div><div class="val">\${total}</div></div>
    <div class="stat-card"><div class="lbl">Total a Pagar</div><div class="val green">\${totalPagar.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</div></div>
    <div class="stat-card"><div class="lbl">Horas/mês</div><div class="val">\${totalH}h</div></div>
    <div class="stat-card"><div class="lbl">Com Plano</div><div class="val">\${comPlano}</div></div>
    <div class="stat-card"><div class="lbl">Especialidades</div><div class="val">\${esps}</div></div>\`;

  if (relFiltro === '') {
    document.getElementById('rel-card').style.display = 'block';
    document.getElementById('rel-detalhe').style.display = 'none';
    document.getElementById('rel-titulo').innerHTML = \`<i class="ti ti-chart-bar" style="color:var(--green)"></i> Relatório por Especialidade\`;
    document.getElementById('rel-tbody').innerHTML = ESPS.map(e => {
      const g = profissionais.filter(p=>p.esp===e);
      if (!g.length) return '';
      const carga = g.reduce((s,p)=>s+parseFloat(p.cmen||0),0);
      const pagar = g.reduce((s,p)=>s+parseCurrency(String(p.vrec)),0);
      const i = ESPS.indexOf(e) % BADGES.length;
      return \`<tr><td><span class="badge \${BADGES[i]}">\${e}</span></td><td>\${g.length}</td><td>\${carga}h</td>
        <td style="font-weight:600;color:var(--green-dark)">\${pagar.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
        <td>\${g.filter(p=>p.plano==='Sim').length}</td></tr>\`;
    }).join('');
    document.getElementById('rel-empty').style.display = profissionais.length ? 'none' : 'block';
  } else {
    document.getElementById('rel-card').style.display = 'none';
    document.getElementById('rel-detalhe').style.display = 'block';
    const i = ESPS.indexOf(relFiltro) % BADGES.length;
    document.getElementById('rel-det-titulo').innerHTML = \`<i class="ti ti-list" style="color:var(--green)"></i> Profissionais — <span class="badge \${BADGES[i]}">\${relFiltro}</span>\`;
    document.getElementById('rel-det-tbody').innerHTML = profissionais.filter(p=>p.esp===relFiltro).map(p=>\`<tr>
      <td><strong style="font-weight:500">\${p.nome}</strong></td>
      <td style="font-size:12px">\${p.cargo||'-'}</td>
      <td style="font-size:12px">\${p.conselho?p.conselho+' '+p.ncons:'-'}</td>
      <td style="font-size:12px">\${p.horario||'-'}</td>
      <td style="font-size:12px">\${p.csem||0}h</td>
      <td style="font-size:12px">\${p.cmen||0}h</td>
      <td style="font-size:12px">\${fmtStored(p.hora)}</td>
      <td style="font-weight:600;color:var(--green-dark)">\${fmtStored(p.vrec)}</td>
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
server.listen(PORT, () => console.log('Rodando na porta ' + PORT));
