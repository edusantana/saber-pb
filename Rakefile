require 'date'


desc "Compacta todos os arquivos para gerar uma versão"
task :zip do
  versao = Date.today.strftime("%Y.%m.%d")
  sh %Q(zip saber-pb.#{versao}.zip manifest.json options.html options.js saber.js)
  puts "NOTE: Lembrar de atualizar versão em manifest.json: #{versao}"
end

task :default => [:zip]
