require 'date'


desc "Compacta todos os arquivos para gerar uma versão"
task :zip do
  versao = Date.today.strftime("%Y.%m.%d")
  sh %Q(zip -r saber-pb.#{versao}.zip manifest.json options.html options.js saber.js icon*.png js/ dist/)
  puts "NOTE: Lembrar de atualizar versão em manifest.json: #{versao}"
end

task :default => [:zip]

rule '.svg' => ['.dot'] do |t|
  sh "dot -Tsvg #{t.name.ext('.dot')} > #{t.name}"
end
