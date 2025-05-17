package ch.datahackdays.baustelleninfo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.datahackdays.baustelleninfo.model.Baustelle;
import ch.datahackdays.baustelleninfo.repository.BaustellenRepository;

@RestController
@RequestMapping("/api/baustellen")
public class BaustellenController {

    @Autowired
    private BaustellenRepository baustellenRepository;

    @GetMapping
    public List<Baustelle> getAllBaustellen() {
        return baustellenRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Baustelle> getBaustelleById(@PathVariable Long id) {
        return baustellenRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Baustelle createBaustelle(@RequestBody Baustelle baustelle) {
        return baustellenRepository.save(baustelle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Baustelle> updateBaustelle(@PathVariable Long id, @RequestBody Baustelle baustelle) {
        return baustellenRepository.findById(id).map(existingBaustelle -> {
            // Update fields
            existingBaustelle.setProjektNummer(baustelle.getProjektNummer());
            existingBaustelle.setDauerVon(baustelle.getDauerVon());
            existingBaustelle.setDauerBis(baustelle.getDauerBis());
            existingBaustelle.setAchsBezeichnung(baustelle.getAchsBezeichnung());
            existingBaustelle.setStatus(baustelle.getStatus());
            existingBaustelle.setGeoJsonData(baustelle.getGeoJsonData());

            // Save updated entity
            return ResponseEntity.ok(baustellenRepository.save(existingBaustelle));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBaustelle(@PathVariable Long id) {
        return baustellenRepository.findById(id).map(baustelle -> {
            baustellenRepository.delete(baustelle);
            return ResponseEntity.noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
